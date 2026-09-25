<?php

namespace App\Services\NASA;

use App\Contracts\NASADataProvider;
use App\Exceptions\NASADataUnavailableException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NASAPowerProvider implements NASADataProvider
{
    public function fetch(float $latitude, float $longitude, string $startDate, string $endDate, array $variables): array
    {
        $parameters = array_values(array_unique($variables ?: config('services.nasa.power.default_variables')));
        $baseUrl = rtrim(config('services.nasa.power.base_url'), '/');
        $url = "{$baseUrl}/temporal/daily/point/{$latitude}/{$longitude}";

        try {
            $response = Http::acceptJson()
                ->timeout((int) config('services.nasa.power.timeout', 20))
                ->retry(2, 250)
                ->get($url, [
                    'parameters' => implode(',', $parameters),
                    'community' => config('services.nasa.power.community', 'ag'),
                    'start' => str_replace('-', '', $startDate),
                    'end' => str_replace('-', '', $endDate),
                    'format' => 'json',
                ]);

            $response->throw();
            $payload = $response->json();
            $series = data_get($payload, 'properties.parameter', []);
            $units = data_get($payload, 'properties.parameter_units', []);

            if (! is_array($series) || $series === []) {
                throw new NASADataUnavailableException('NASA POWER returned no observations.');
            }

            $observations = [];
            foreach ($series as $variable => $dates) {
                foreach ((array) $dates as $date => $value) {
                    // NASA POWER uses -999 for unavailable values.
                    if (! is_numeric($value) || (float) $value <= -998) {
                        continue;
                    }

                    $observations[] = [
                        'dataset' => 'NASA POWER Daily Point',
                        'variable' => $variable,
                        'latitude' => $latitude,
                        'longitude' => $longitude,
                        'observation_date' => date('Y-m-d', strtotime((string) $date)),
                        'value' => (float) $value,
                        'unit' => $units[$variable] ?? 'unknown',
                        'source' => 'NASA POWER',
                        'metadata' => [
                            'status' => 'live',
                            'provider' => 'NASA POWER',
                            'endpoint' => $url,
                            'community' => config('services.nasa.power.community', 'ag'),
                            'retrieved_at' => now()->toIso8601String(),
                        ],
                    ];
                }
            }

            if ($observations === []) {
                throw new NASADataUnavailableException('NASA POWER returned no usable observations.');
            }

            return $observations;
        } catch (\Throwable $exception) {
            Log::warning('NASA POWER request failed.', [
                'url' => $url,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'start' => $startDate,
                'end' => $endDate,
                'error' => $exception->getMessage(),
            ]);

            throw new NASADataUnavailableException('NASA POWER is currently unavailable.', 0, $exception);
        }
    }
}
