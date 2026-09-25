<?php

namespace Tests\Feature;

use App\Models\Crop;
use App\Models\FarmerPreference;
use App\Models\Field;
use App\Models\NASAObservation;
use App\Models\SoilProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RotationAnalysisApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_returns_transparent_weighted_rotation_analysis(): void
    {
        $field = Field::query()->create(['name' => 'North Field', 'latitude' => 23.8103, 'longitude' => 90.4125]);
        $rice = Crop::query()->create(['name' => 'Rice', 'crop_family' => 'Poaceae', 'water_requirement' => 'High', 'heat_tolerance' => 'High', 'drought_tolerance' => 'Low', 'soil_benefit' => 'Cereal residue']);
        $lentil = Crop::query()->create(['name' => 'Lentil', 'crop_family' => 'Fabaceae', 'water_requirement' => 'Low–Moderate', 'heat_tolerance' => 'Moderate', 'drought_tolerance' => 'High', 'soil_benefit' => 'Legume that supports nitrogen fixation']);
        SoilProfile::query()->create(['field_id' => $field->id, 'ph' => 6.5, 'organic_matter' => 2.5, 'drainage' => 'good', 'irrigation_available' => true]);
        FarmerPreference::query()->create(['field_id' => $field->id, 'water_conservation' => 80, 'soil_improvement' => 70, 'yield_stability' => 60, 'economic_return' => 50, 'climate_resilience' => 80, 'crop_diversity' => 90]);
        NASAObservation::query()->create(['dataset' => 'NASA POWER Daily Point', 'variable' => 'T2M', 'latitude' => 23.8103, 'longitude' => 90.4125, 'observation_date' => '2026-09-24', 'value' => 28, 'unit' => 'deg C', 'source' => 'NASA POWER', 'metadata' => ['status' => 'live']]);

        $response = $this->postJson("/api/fields/{$field->id}/rotation-analysis", [
            'rotation' => [['year' => 2027, 'crop_id' => $rice->id], ['year' => 2028, 'crop_id' => $lentil->id]],
        ]);

        $response->assertOk()
            ->assertJsonPath('title', 'AgroOrbit Rotation Compatibility Index')
            ->assertJsonStructure(['inputs', 'weights', 'intermediate_indicators', 'average_indicators', 'weighted_contributions', 'compatibility_index', 'limitations'])
            ->assertJsonPath('inputs.field.name', 'North Field');
        $this->assertGreaterThanOrEqual(0, $response->json('compatibility_index'));
        $this->assertLessThanOrEqual(100, $response->json('compatibility_index'));
    }

    public function test_requires_a_valid_rotation(): void
    {
        $field = Field::query()->create(['name' => 'Field', 'latitude' => 1, 'longitude' => 2]);
        $this->postJson("/api/fields/{$field->id}/rotation-analysis", ['rotation' => []])
            ->assertUnprocessable()->assertJsonValidationErrors('rotation');
    }
}
