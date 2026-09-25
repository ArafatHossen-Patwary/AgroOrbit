<?php

namespace App\Services;

use App\Models\Crop;
use App\Models\FarmerPreference;
use App\Models\Field;
use App\Models\NASAObservation;
use Illuminate\Support\Collection;
use InvalidArgumentException;

class RotationAnalysisService
{
    /**
     * This is a transparent decision-support heuristic, not a yield model.
     * Every component is normalized to 0..100 and the farmer's priorities are
     * normalized into weights before the weighted mean is calculated.
     *
     * @param array<int, array{year:int, crop_id:int}> $rotation
     * @return array<string, mixed>
     */
    public function analyze(Field $field, array $rotation, ?string $startDate = null, ?string $endDate = null): array
    {
        $cropIds = collect($rotation)->pluck('crop_id')->unique()->values();
        $crops = Crop::query()->whereIn('id', $cropIds)->get()->keyBy('id');

        if ($crops->count() !== $cropIds->count()) {
            throw new InvalidArgumentException('Every rotation crop must exist in the crop database.');
        }

        $soil = $field->soilProfile;
        $preferences = $field->farmerPreference;
        $observations = $this->observations($field, $startDate, $endDate);
        $environment = $this->environmentIndicators($observations);

        $indicators = [];
        foreach ($rotation as $entry) {
            $crop = $crops->get($entry['crop_id']);
            $indicators[] = [
                'year' => (int) $entry['year'],
                'crop_id' => $crop->id,
                'crop' => $crop->name,
                'water_compatibility' => $this->waterCompatibility($crop, $soil, $environment),
                'soil_benefit' => $this->soilBenefit($crop, $soil),
                'climate_compatibility' => $this->climateCompatibility($crop, $environment),
                'crop_diversity' => 0,
                'heat_compatibility' => $this->toleranceScore($crop->heat_tolerance, $environment['temperature_c']),
                'drought_compatibility' => $this->toleranceScore($crop->drought_tolerance, $environment['precipitation_mm']),
                'yield_stability_indicator' => $this->yieldStability($crop, $soil, $environment),
            ];
        }

        $uniqueFamilies = $crops->pluck('crop_family')->filter()->unique()->count();
        $diversity = $this->clamp(($uniqueFamilies / max(count($rotation), 1)) * 100);
        foreach ($indicators as &$indicator) {
            $indicator['crop_diversity'] = round($diversity, 2);
        }
        unset($indicator);

        $averages = $this->averageIndicators($indicators);
        $weights = $this->weights($preferences);
        $weightedContributions = [];
        foreach ($averages as $key => $average) {
            $weightedContributions[$key] = round($average * ($weights[$key] ?? 0), 4);
        }

        return [
            'title' => 'AgroOrbit Rotation Compatibility Index',
            'field' => [
                'id' => $field->id,
                'name' => $field->name,
                'latitude' => $field->latitude,
                'longitude' => $field->longitude,
            ],
            'inputs' => [
                'rotation' => $rotation,
                'crops' => $crops->values()->map(fn (Crop $crop) => [
                    'id' => $crop->id,
                    'name' => $crop->name,
                    'crop_family' => $crop->crop_family,
                    'water_requirement' => $crop->water_requirement,
                    'heat_tolerance' => $crop->heat_tolerance,
                    'drought_tolerance' => $crop->drought_tolerance,
                    'nutrient_demand' => $crop->nutrient_demand,
                ])->values(),
                'soil_profile' => $soil ? $soil->only([
                    'soil_type', 'ph', 'organic_matter', 'nitrogen', 'phosphorus',
                    'potassium', 'drainage', 'irrigation_available',
                ]) : null,
                'farmer_priorities' => $preferences?->only([
                    'water_conservation', 'soil_improvement', 'yield_stability',
                    'economic_return', 'climate_resilience', 'crop_diversity',
                ]),
                'nasa_environment' => $environment,
            ],
            'weights' => $weights,
            'intermediate_indicators' => $indicators,
            'average_indicators' => $averages,
            'weighted_contributions' => $weightedContributions,
            'compatibility_index' => round(array_sum($weightedContributions) * 100, 2),
            'calculation' => 'Each indicator is normalized to 0–100. Priority values are normalized so their sum is 1. The index is the weighted mean of the seven transparent indicator averages.',
            'limitations' => [
                'This is a decision-support indicator, not a scientifically validated crop-yield prediction.',
                'Crop characteristics are reference database values, not NASA observations or laboratory measurements.',
                'NASA environmental inputs come only from persisted NASA POWER observations; missing data is reported as unavailable.',
                'The heuristic does not model pests, market prices, cultivar choice, farm operations, exact water budgets, or local agronomic recommendations.',
                'Economic return is represented through the farmer priority weight; no market-price forecast is generated.',
            ],
        ];
    }

    private function observations(Field $field, ?string $startDate, ?string $endDate): Collection
    {
        return NASAObservation::query()
            ->whereBetween('latitude', [$field->latitude - 0.00001, $field->latitude + 0.00001])
            ->whereBetween('longitude', [$field->longitude - 0.00001, $field->longitude + 0.00001])
            ->when($startDate, fn ($query) => $query->whereDate('observation_date', '>=', $startDate))
            ->when($endDate, fn ($query) => $query->whereDate('observation_date', '<=', $endDate))
            ->get();
    }

    private function environmentIndicators(Collection $observations): array
    {
        $temperature = $observations->where('variable', 'T2M')->avg('value');
        $precipitation = $observations->where('variable', 'PRECTOTCORR')->sum('value');
        $solar = $observations->where('variable', 'ALLSKY_SFC_SW_DWN')->avg('value');

        return [
            'temperature_c' => $temperature !== null ? round((float) $temperature, 2) : null,
            'precipitation_mm' => $observations->where('variable', 'PRECTOTCORR')->isNotEmpty() ? round((float) $precipitation, 2) : null,
            'solar_mj_m2_day' => $solar !== null ? round((float) $solar, 2) : null,
            'observations_count' => $observations->count(),
            'source_status' => $observations->isEmpty() ? 'unavailable' : ($observations->contains(fn ($item) => str_contains($item->source, 'cached')) ? 'cached' : 'observed'),
            'source' => 'NASA POWER persisted observations',
        ];
    }

    private function weights(?FarmerPreference $preferences): array
    {
        $raw = [
            'water_compatibility' => $preferences?->water_conservation ?? 50,
            'soil_benefit' => $preferences?->soil_improvement ?? 50,
            'climate_compatibility' => $preferences?->climate_resilience ?? 50,
            'crop_diversity' => $preferences?->crop_diversity ?? 50,
            'heat_compatibility' => $preferences?->climate_resilience ?? 50,
            'drought_compatibility' => $preferences?->climate_resilience ?? 50,
            'yield_stability_indicator' => (($preferences?->yield_stability ?? 50) + ($preferences?->economic_return ?? 50)) / 2,
        ];
        $sum = max(array_sum($raw), 1);
        $weights = [];
        foreach ($raw as $key => $value) {
            $weights[$key] = round($value / $sum, 6);
        }

        return $weights;
    }

    private function averageIndicators(array $indicators): array
    {
        $keys = ['water_compatibility', 'soil_benefit', 'climate_compatibility', 'crop_diversity', 'heat_compatibility', 'drought_compatibility', 'yield_stability_indicator'];
        $averages = [];
        foreach ($keys as $key) {
            $averages[$key] = round(array_sum(array_column($indicators, $key)) / max(count($indicators), 1), 2);
        }

        return $averages;
    }

    private function waterCompatibility(Crop $crop, ?object $soil, array $environment): float
    {
        $score = $this->requirementScore($crop->water_requirement);
        if ($soil?->irrigation_available === true) $score += 10;
        if ($environment['precipitation_mm'] !== null && $environment['precipitation_mm'] < 10 && $score < 50) $score -= 10;
        return $this->clamp($score);
    }

    private function soilBenefit(Crop $crop, ?object $soil): float
    {
        $score = str_contains(strtolower((string) $crop->soil_benefit), 'legume') || $crop->crop_family === 'Fabaceae' ? 85 : 60;
        if ($soil?->organic_matter !== null && $soil->organic_matter < 2 && $score >= 60) $score += 5;
        return $this->clamp($score);
    }

    private function climateCompatibility(Crop $crop, array $environment): float
    {
        return round(($this->toleranceScore($crop->heat_tolerance, $environment['temperature_c']) + $this->toleranceScore($crop->drought_tolerance, $environment['precipitation_mm'])) / 2, 2);
    }

    private function yieldStability(Crop $crop, ?object $soil, array $environment): float
    {
        $score = 55;
        if ($soil?->ph !== null && $soil->ph >= 5.5 && $soil->ph <= 7.5) $score += 15;
        if ($soil?->drainage === 'good' || $soil?->drainage === 'excellent') $score += 10;
        if ($crop->crop_family === 'Fabaceae') $score += 5;
        if ($environment['temperature_c'] !== null) $score += 5;
        return $this->clamp($score);
    }

    private function requirementScore(?string $value): float
    {
        return match (strtolower((string) $value)) {
            'low' => 85, 'low–moderate', 'low-moderate' => 75,
            'moderate' => 65, 'moderate–high', 'moderate-high' => 50,
            'high' => 30, default => 50,
        };
    }

    private function toleranceScore(?string $tolerance, ?float $observation): float
    {
        $base = match (strtolower((string) $tolerance)) {
            'high' => 85, 'moderate–high', 'moderate-high' => 75,
            'moderate' => 60, 'low–moderate', 'low-moderate' => 45,
            'low' => 30, default => 50,
        };
        if ($observation === null) return $base;
        return $this->clamp($base);
    }

    private function clamp(float $value): float
    {
        return round(max(0, min(100, $value)), 2);
    }
}
