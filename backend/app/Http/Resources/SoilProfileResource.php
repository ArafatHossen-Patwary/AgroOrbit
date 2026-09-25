<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\SoilProfile */
class SoilProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'field_id' => $this->field_id,
            'soil_type' => $this->soil_type,
            'ph' => $this->ph,
            'organic_matter' => $this->organic_matter,
            'nitrogen' => $this->nitrogen,
            'phosphorus' => $this->phosphorus,
            'potassium' => $this->potassium,
            'drainage' => $this->drainage,
            'irrigation_available' => $this->irrigation_available,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
