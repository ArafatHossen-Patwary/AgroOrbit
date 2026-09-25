<?php

namespace Tests\Feature;

use App\Models\Field;
use App\Models\SoilProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SoilProfileApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_and_read_a_soil_profile_for_a_field(): void
    {
        $field = Field::query()->create(['name' => 'Plot A', 'latitude' => 23.8, 'longitude' => 90.4]);

        $this->postJson("/api/fields/{$field->id}/soil-profile", [
            'soil_type' => 'loam', 'ph' => 6.5, 'organic_matter' => 3.2,
            'nitrogen' => 40, 'phosphorus' => 18, 'potassium' => 120,
            'drainage' => 'good', 'irrigation_available' => true,
        ])->assertCreated()->assertJsonPath('data.field_id', $field->id)->assertJsonPath('data.soil_type', 'loam');

        $this->getJson("/api/fields/{$field->id}/soil-profile")
            ->assertOk()->assertJsonPath('data.ph', 6.5);
    }

    public function test_can_update_the_existing_profile_and_reject_invalid_values(): void
    {
        $field = Field::query()->create(['name' => 'Plot B', 'latitude' => 23.8, 'longitude' => 90.4]);
        SoilProfile::query()->create(['field_id' => $field->id, 'ph' => 7]);

        $this->putJson("/api/fields/{$field->id}/soil-profile", ['ph' => 5.8, 'drainage' => 'moderate'])
            ->assertOk()->assertJsonPath('data.ph', 5.8);
        $this->assertDatabaseCount('soil_profiles', 1);

        $this->putJson("/api/fields/{$field->id}/soil-profile", ['ph' => 15, 'drainage' => 'unknown'])
            ->assertUnprocessable()->assertJsonValidationErrors(['ph', 'drainage']);
    }

    public function test_profile_is_deleted_with_its_field(): void
    {
        $field = Field::query()->create(['name' => 'Plot C', 'latitude' => 23.8, 'longitude' => 90.4]);
        $profile = SoilProfile::query()->create(['field_id' => $field->id]);
        $field->delete();
        $this->assertDatabaseMissing('soil_profiles', ['id' => $profile->id]);
    }
}
