<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('crops', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('scientific_name')->nullable();
            $table->string('crop_family')->nullable();
            $table->string('water_requirement')->nullable();
            $table->string('heat_tolerance')->nullable();
            $table->string('drought_tolerance')->nullable();
            $table->text('soil_benefit')->nullable();
            $table->string('nutrient_demand')->nullable();
            $table->string('growing_duration')->nullable();
            $table->json('suitable_soils')->nullable();
            $table->json('seasons')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('crops');
    }
};
