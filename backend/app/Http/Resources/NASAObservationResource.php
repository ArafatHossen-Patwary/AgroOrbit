<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\NASAObservation */
class NASAObservationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'dataset' => $this->dataset,
            'variable' => $this->variable,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'observation_date' => $this->observation_date?->format('Y-m-d'),
            'value' => $this->value,
            'unit' => $this->unit,
            'source' => $this->source,
            'metadata' => $this->metadata,
        ];
    }
}
