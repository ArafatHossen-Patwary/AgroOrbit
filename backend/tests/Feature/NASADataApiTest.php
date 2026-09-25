<?php

namespace Tests\Feature;

use App\Models\NASAObservation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class NASADataApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_fetches_and_persists_live_nasa_power_observations(): void
    {
        Http::fake([
            'https://power.larc.nasa.gov/api/*' => Http::response([
                'properties' => [
                    'parameter' => [
                        'PRECTOTCORR' => ['20260924' => 4.2],
                        'T2M' => ['20260924' => 28.5],
                    ],
                    'parameter_units' => [
                        'PRECTOTCORR' => 'mm/day',
                        'T2M' => 'deg C',
                    ],
                ],
            ], 200),
        ]);

        $response = $this->getJson('/api/nasa/observations?latitude=23.8103&longitude=90.4125&start_date=2026-09-24&end_date=2026-09-24&variables=PRECTOTCORR,T2M');

        $response->assertOk()
            ->assertJsonPath('status', 'live')
            ->assertJsonPath('cached', false)
            ->assertJsonPath('data.0.dataset', 'NASA POWER Daily Point');

        $this->assertDatabaseHas('nasa_observations', [
            'variable' => 'PRECTOTCORR',
            'observation_date' => '2026-09-24',
            'value' => 4.2,
            'source' => 'NASA POWER',
        ]);
    }

    public function test_returns_cached_observations_when_nasa_power_is_unavailable(): void
    {
        NASAObservation::query()->create([
            'dataset' => 'NASA POWER Daily Point',
            'variable' => 'T2M',
            'latitude' => 23.8103,
            'longitude' => 90.4125,
            'observation_date' => '2026-09-24',
            'value' => 28.5,
            'unit' => 'deg C',
            'source' => 'NASA POWER',
            'metadata' => ['status' => 'live'],
        ]);

        Http::fake([
            'https://power.larc.nasa.gov/api/*' => Http::response([], 503),
        ]);

        $response = $this->getJson('/api/nasa/observations?latitude=23.8103&longitude=90.4125&start_date=2026-09-24&end_date=2026-09-24&variables=T2M');

        $response->assertOk()
            ->assertJsonPath('status', 'cached')
            ->assertJsonPath('cached', true)
            ->assertJsonPath('data.0.source', 'NASA POWER (cached)')
            ->assertJsonPath('data.0.metadata.status', 'cached');
    }

    public function test_returns_service_unavailable_without_live_or_cached_data(): void
    {
        Http::fake([
            'https://power.larc.nasa.gov/api/*' => Http::response([], 503),
        ]);

        $this->getJson('/api/nasa/observations?latitude=23.8103&longitude=90.4125&start_date=2026-09-24&end_date=2026-09-24')
            ->assertStatus(503)
            ->assertJsonPath('status', 'unavailable')
            ->assertJsonPath('cached', false);
    }

    public function test_validates_observation_query_coordinates_and_dates(): void
    {
        $this->getJson('/api/nasa/observations?latitude=100&longitude=181&start_date=not-a-date')
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['latitude', 'longitude', 'start_date']);
    }
}
