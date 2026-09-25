<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SoilProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'field_id',
        'soil_type',
        'ph',
        'organic_matter',
        'nitrogen',
        'phosphorus',
        'potassium',
        'drainage',
        'irrigation_available',
    ];

    protected function casts(): array
    {
        return [
            'field_id' => 'integer',
            'ph' => 'float',
            'organic_matter' => 'float',
            'nitrogen' => 'float',
            'phosphorus' => 'float',
            'potassium' => 'float',
            'irrigation_available' => 'boolean',
        ];
    }

    public function field(): BelongsTo
    {
        return $this->belongsTo(Field::class);
    }
}
