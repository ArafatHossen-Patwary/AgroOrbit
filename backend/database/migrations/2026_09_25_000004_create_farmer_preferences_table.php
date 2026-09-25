<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('farmer_preferences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('field_id')->unique()->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('water_conservation')->default(50);
            $table->unsignedTinyInteger('soil_improvement')->default(50);
            $table->unsignedTinyInteger('yield_stability')->default(50);
            $table->unsignedTinyInteger('economic_return')->default(50);
            $table->unsignedTinyInteger('climate_resilience')->default(50);
            $table->unsignedTinyInteger('crop_diversity')->default(50);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('farmer_preferences');
    }
};
