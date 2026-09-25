<?php

namespace Tests\Feature;

use App\Models\Field;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FieldApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_fields(): void
    {
        Field::query()->create([
            'name' => 'Plot A',
            'latitude' => 23.81,
            'longitude' => 90.41,
            'boundary' => null,
            'area' => null,
            'current_crop' => 'rice',
        ]);

        $response = $this->getJson('/api/fields');

        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Plot A');
    }

    public function test_can_create_field(): void
    {
        $payload = [
            'name' => 'North Valley',
            'latitude' => 23.8103,
            'longitude' => 90.4125,
            'boundary' => [
                ['lat' => 23.8100, 'lng' => 90.4120],
                ['lat' => 23.8110, 'lng' => 90.4120],
                ['lat' => 23.8110, 'lng' => 90.4130],
                ['lat' => 23.8100, 'lng' => 90.4130],
            ],
            'area' => 12500.5,
            'current_crop' => 'wheat',
        ];

        $response = $this->postJson('/api/fields', $payload);

        $response->assertCreated()
            ->assertJsonPath('data.name', 'North Valley')
            ->assertJsonPath('data.current_crop', 'wheat');

        $this->assertDatabaseHas('fields', [
            'name' => 'North Valley',
            'current_crop' => 'wheat',
        ]);
    }

    public function test_create_field_validation_errors(): void
    {
        $response = $this->postJson('/api/fields', [
            'name' => '',
            'latitude' => 200,
            'longitude' => 90,
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'latitude']);
    }

    public function test_can_show_field(): void
    {
        $field = Field::query()->create([
            'name' => 'Show Me',
            'latitude' => 10.5,
            'longitude' => 20.5,
        ]);

        $this->getJson("/api/fields/{$field->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $field->id)
            ->assertJsonPath('data.name', 'Show Me');
    }

    public function test_missing_field_returns_json_not_found_response(): void
    {
        $this->getJson('/api/fields/999999')
            ->assertNotFound();
    }

    public function test_can_update_field(): void
    {
        $field = Field::query()->create([
            'name' => 'Old Name',
            'latitude' => 10,
            'longitude' => 20,
            'current_crop' => 'rice',
        ]);

        $this->putJson("/api/fields/{$field->id}", [
            'name' => 'Updated Name',
            'current_crop' => 'maize',
        ])
            ->assertOk()
            ->assertJsonPath('data.name', 'Updated Name')
            ->assertJsonPath('data.current_crop', 'maize');
    }

    public function test_update_field_validation_errors(): void
    {
        $field = Field::query()->create([
            'name' => 'Valid Field',
            'latitude' => 10,
            'longitude' => 20,
        ]);

        $this->putJson("/api/fields/{$field->id}", [
            'latitude' => -91,
            'boundary' => [
                ['lat' => 10, 'lng' => 20],
                ['lat' => 11, 'lng' => 21],
            ],
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['latitude', 'boundary']);
    }

    public function test_can_delete_field(): void
    {
        $field = Field::query()->create([
            'name' => 'Delete Me',
            'latitude' => 1,
            'longitude' => 2,
        ]);

        $this->deleteJson("/api/fields/{$field->id}")
            ->assertOk()
            ->assertJsonPath('message', 'Field deleted successfully.');

        $this->assertDatabaseMissing('fields', ['id' => $field->id]);
    }

    public function test_missing_field_cannot_be_deleted(): void
    {
        $this->deleteJson('/api/fields/999999')
            ->assertNotFound();
    }
}
