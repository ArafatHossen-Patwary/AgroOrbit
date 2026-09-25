<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\FarmerPreference */
class FarmerPreferenceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'field_id' => $this->field_id,
            'water_conservation' => $this->water_conservation,
            'soil_improvement' => $this->soil_improvement,
            'yield_stability' => $this->yield_stability,
            'economic_return' => $this->economic_return,
            'climate_resilience' => $this->climate_resilience,
            'crop_diversity' => $this->crop_diversity,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
