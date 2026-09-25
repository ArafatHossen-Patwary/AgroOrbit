<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Crop */
class CropResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'scientific_name' => $this->scientific_name,
            'crop_family' => $this->crop_family,
            'water_requirement' => $this->water_requirement,
            'heat_tolerance' => $this->heat_tolerance,
            'drought_tolerance' => $this->drought_tolerance,
            'soil_benefit' => $this->soil_benefit,
            'nutrient_demand' => $this->nutrient_demand,
            'growing_duration' => $this->growing_duration,
            'suitable_soils' => $this->suitable_soils ?? [],
            'seasons' => $this->seasons ?? [],
        ];
    }
}
