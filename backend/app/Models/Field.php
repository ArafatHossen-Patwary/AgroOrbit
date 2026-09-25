<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Field extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'latitude',
        'longitude',
        'boundary',
        'area',
        'current_crop',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
            'area' => 'float',
            'boundary' => 'array',
        ];
    }

    public function soilProfile(): HasOne
    {
        return $this->hasOne(SoilProfile::class);
    }
}
