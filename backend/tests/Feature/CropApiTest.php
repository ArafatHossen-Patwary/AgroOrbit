<?php

namespace Tests\Feature;

use App\Models\Crop;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CropApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_seeded_crops(): void
    {
        Crop::query()->create(['name' => 'Rice', 'crop_family' => 'Poaceae', 'seasons' => ['monsoon']]);
        Crop::query()->create(['name' => 'Wheat', 'crop_family' => 'Poaceae', 'seasons' => ['winter']]);

        $this->getJson('/api/crops')->assertOk()->assertJsonCount(2, 'data')->assertJsonPath('data.0.name', 'Rice');
    }

    public function test_can_show_a_crop(): void
    {
        $crop = Crop::query()->create(['name' => 'Lentil', 'scientific_name' => 'Lens culinaris', 'suitable_soils' => ['loam']]);

        $this->getJson("/api/crops/{$crop->id}")->assertOk()->assertJsonPath('data.name', 'Lentil')->assertJsonPath('data.suitable_soils.0', 'loam');
    }
}
