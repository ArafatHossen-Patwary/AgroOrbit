<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FarmerPreference extends Model
{
    use HasFactory;

    protected $fillable = [
        'field_id',
        'water_conservation',
        'soil_improvement',
        'yield_stability',
        'economic_return',
        'climate_resilience',
        'crop_diversity',
    ];

    protected function casts(): array
    {
        return [
            'field_id' => 'integer',
            'water_conservation' => 'integer',
            'soil_improvement' => 'integer',
            'yield_stability' => 'integer',
            'economic_return' => 'integer',
            'climate_resilience' => 'integer',
            'crop_diversity' => 'integer',
        ];
    }

    public function field(): BelongsTo
    {
        return $this->belongsTo(Field::class);
    }
}
