<?php

namespace App\Services;

use App\Contracts\NASADataProvider;
use App\Exceptions\NASADataUnavailableException;
use App\Models\NASAObservation;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class NASADataService
{
    public function __construct(private readonly NASADataProvider $provider)
    {
    }

    /**
     * Fetch live NASA POWER observations and persist them. If the provider is
     * unavailable, return matching persisted observations explicitly marked cached.
     *
     * @return array{observations: Collection, status: string}
     */
    public function observations(float $latitude, float $longitude, string $startDate, string $endDate, array $variables = []): array
    {
        try {
            $rows = $this->provider->fetch($latitude, $longitude, $startDate, $endDate, $variables);
            $observations = DB::transaction(function () use ($rows) {
                foreach ($rows as $row) {
                    NASAObservation::query()->updateOrCreate(
                        [
                            'dataset' => $row['dataset'],
                            'variable' => $row['variable'],
                            'latitude' => $row['latitude'],
                            'longitude' => $row['longitude'],
                            'observation_date' => $row['observation_date'],
                        ],
                        $row,
                    );
                }
            });

            return [
                'observations' => $this->query($latitude, $longitude, $startDate, $endDate, $variables),
                'status' => 'live',
            ];
        } catch (NASADataUnavailableException $exception) {
            $cached = $this->query($latitude, $longitude, $startDate, $endDate, $variables);

            if ($cached->isEmpty()) {
                throw $exception;
            }

            $cached->each(function (NASAObservation $observation) use ($exception): void {
                $metadata = $observation->metadata ?: [];
                $metadata['status'] = 'cached';
                $metadata['cache_reason'] = 'NASA POWER was unavailable; showing the latest persisted NASA observation.';
                $metadata['fallback_error'] = $exception->getMessage();
                $observation->setAttribute('metadata', $metadata);
                $observation->setAttribute('source', 'NASA POWER (cached)');
            });

            return ['observations' => $cached, 'status' => 'cached'];
        }
    }

    private function query(float $latitude, float $longitude, string $startDate, string $endDate, array $variables): Collection
    {
        return NASAObservation::query()
            ->whereBetween('latitude', [$latitude - 0.00001, $latitude + 0.00001])
            ->whereBetween('longitude', [$longitude - 0.00001, $longitude + 0.00001])
            ->whereBetween('observation_date', [$startDate, $endDate])
            ->when($variables !== [], fn ($query) => $query->whereIn('variable', $variables))
            ->orderBy('observation_date')
            ->orderBy('variable')
            ->get();
    }
}
