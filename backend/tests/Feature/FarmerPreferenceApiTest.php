<?php

namespace Tests\Feature;

use App\Models\Field;
use App\Models\FarmerPreference;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FarmerPreferenceApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_store_and_fetch_preferences_for_a_field(): void
    {
        $field = Field::query()->create(['name' => 'Plot A', 'latitude' => 23.8, 'longitude' => 90.4]);

        $response = $this->postJson("/api/fields/{$field->id}/preferences", [
            'water_conservation' => 70,
            'soil_improvement' => 80,
            'yield_stability' => 90,
            'economic_return' => 65,
            'climate_resilience' => 75,
            'crop_diversity' => 60,
        ]);

        $response->assertCreated()->assertJsonPath('data.field_id', $field->id)->assertJsonPath('data.water_conservation', 70);

        $this->getJson("/api/fields/{$field->id}/preferences")
            ->assertOk()->assertJsonPath('data.crop_diversity', 60);
    }

    public function test_requires_values_between_zero_and_hundred(): void
    {
        $field = Field::query()->create(['name' => 'Plot B', 'latitude' => 23.8, 'longitude' => 90.4]);

        $this->postJson("/api/fields/{$field->id}/preferences", [
            'water_conservation' => 110,
            'soil_improvement' => -1,
            'yield_stability' => 50,
            'economic_return' => 55,
            'climate_resilience' => 60,
            'crop_diversity' => 45,
        ])->assertUnprocessable()->assertJsonValidationErrors(['water_conservation', 'soil_improvement']);
    }

    public function test_preferences_are_deleted_with_the_field(): void
    {
        $field = Field::query()->create(['name' => 'Plot C', 'latitude' => 23.8, 'longitude' => 90.4]);
        $preference = FarmerPreference::query()->create(['field_id' => $field->id, 'water_conservation' => 50]);

        $field->delete();

        $this->assertDatabaseMissing('farmer_preferences', ['id' => $preference->id]);
    }
}
