<?php

namespace Database\Seeders;

use App\Models\Crop;
use Illuminate\Database\Seeder;

class CropSeeder extends Seeder
{
    public function run(): void
    {
        $crops = [
            ['name' => 'Rice', 'scientific_name' => 'Oryza sativa', 'crop_family' => 'Poaceae', 'water_requirement' => 'High', 'heat_tolerance' => 'High', 'drought_tolerance' => 'Low', 'soil_benefit' => 'Provides residue and biomass; flooded systems require careful nutrient management.', 'nutrient_demand' => 'High', 'growing_duration' => '90–150 days', 'suitable_soils' => ['clay', 'clay loam', 'loam'], 'seasons' => ['monsoon', 'summer']],
            ['name' => 'Wheat', 'scientific_name' => 'Triticum aestivum', 'crop_family' => 'Poaceae', 'water_requirement' => 'Moderate', 'heat_tolerance' => 'Moderate', 'drought_tolerance' => 'Moderate', 'soil_benefit' => 'Adds cereal residue that can support soil organic matter when retained.', 'nutrient_demand' => 'High', 'growing_duration' => '100–140 days', 'suitable_soils' => ['loam', 'silt loam', 'clay loam'], 'seasons' => ['winter', 'spring']],
            ['name' => 'Maize', 'scientific_name' => 'Zea mays', 'crop_family' => 'Poaceae', 'water_requirement' => 'Moderate–High', 'heat_tolerance' => 'High', 'drought_tolerance' => 'Moderate', 'soil_benefit' => 'Produces substantial residue and works well in diverse rotations.', 'nutrient_demand' => 'High', 'growing_duration' => '80–120 days', 'suitable_soils' => ['loam', 'sandy loam', 'clay loam'], 'seasons' => ['spring', 'summer', 'monsoon']],
            ['name' => 'Lentil', 'scientific_name' => 'Lens culinaris', 'crop_family' => 'Fabaceae', 'water_requirement' => 'Low–Moderate', 'heat_tolerance' => 'Moderate', 'drought_tolerance' => 'High', 'soil_benefit' => 'Legume that can contribute biological nitrogen fixation.', 'nutrient_demand' => 'Low–Moderate', 'growing_duration' => '90–120 days', 'suitable_soils' => ['silt loam', 'loam', 'sandy loam'], 'seasons' => ['winter', 'spring']],
            ['name' => 'Chickpea', 'scientific_name' => 'Cicer arietinum', 'crop_family' => 'Fabaceae', 'water_requirement' => 'Low–Moderate', 'heat_tolerance' => 'Moderate', 'drought_tolerance' => 'High', 'soil_benefit' => 'Legume that can support nitrogen cycling in a rotation.', 'nutrient_demand' => 'Low–Moderate', 'growing_duration' => '90–120 days', 'suitable_soils' => ['loam', 'sandy loam', 'clay loam'], 'seasons' => ['winter', 'spring']],
            ['name' => 'Mustard', 'scientific_name' => 'Brassica juncea', 'crop_family' => 'Brassicaceae', 'water_requirement' => 'Low–Moderate', 'heat_tolerance' => 'Moderate', 'drought_tolerance' => 'Moderate', 'soil_benefit' => 'Brassica residue can diversify rotations and help interrupt cereal cycles.', 'nutrient_demand' => 'Moderate', 'growing_duration' => '90–120 days', 'suitable_soils' => ['loam', 'sandy loam', 'clay loam'], 'seasons' => ['winter']],
            ['name' => 'Potato', 'scientific_name' => 'Solanum tuberosum', 'crop_family' => 'Solanaceae', 'water_requirement' => 'Moderate–High', 'heat_tolerance' => 'Low–Moderate', 'drought_tolerance' => 'Low', 'soil_benefit' => 'A tuber crop that benefits from loose soil and can diversify cereal rotations.', 'nutrient_demand' => 'High', 'growing_duration' => '90–140 days', 'suitable_soils' => ['sandy loam', 'loam'], 'seasons' => ['winter', 'spring']],
            ['name' => 'Tomato', 'scientific_name' => 'Solanum lycopersicum', 'crop_family' => 'Solanaceae', 'water_requirement' => 'Moderate–High', 'heat_tolerance' => 'Moderate–High', 'drought_tolerance' => 'Low–Moderate', 'soil_benefit' => 'Adds crop diversity; benefits from organic matter and well-drained soil.', 'nutrient_demand' => 'High', 'growing_duration' => '90–150 days', 'suitable_soils' => ['loam', 'sandy loam'], 'seasons' => ['winter', 'spring', 'summer']],
            ['name' => 'Soybean', 'scientific_name' => 'Glycine max', 'crop_family' => 'Fabaceae', 'water_requirement' => 'Moderate', 'heat_tolerance' => 'High', 'drought_tolerance' => 'Moderate', 'soil_benefit' => 'Legume that supports nitrogen fixation and rotation diversity.', 'nutrient_demand' => 'Moderate', 'growing_duration' => '90–150 days', 'suitable_soils' => ['loam', 'silt loam', 'clay loam'], 'seasons' => ['summer', 'monsoon']],
            ['name' => 'Vegetables', 'scientific_name' => null, 'crop_family' => 'Mixed', 'water_requirement' => 'Moderate–High', 'heat_tolerance' => 'Varies', 'drought_tolerance' => 'Varies', 'soil_benefit' => 'A diverse category that can improve crop diversity when managed well.', 'nutrient_demand' => 'Moderate–High', 'growing_duration' => '30–150 days', 'suitable_soils' => ['loam', 'sandy loam', 'silt loam'], 'seasons' => ['winter', 'spring', 'summer', 'monsoon']],
        ];

        foreach ($crops as $crop) {
            Crop::query()->updateOrCreate(['name' => $crop['name']], $crop);
        }
    }
}
