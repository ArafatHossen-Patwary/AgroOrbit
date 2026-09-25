<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('soil_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('field_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('soil_type')->nullable();
            $table->decimal('ph', 4, 2)->nullable();
            $table->decimal('organic_matter', 8, 3)->nullable();
            $table->decimal('nitrogen', 10, 3)->nullable();
            $table->decimal('phosphorus', 10, 3)->nullable();
            $table->decimal('potassium', 10, 3)->nullable();
            $table->string('drainage')->nullable();
            $table->boolean('irrigation_available')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('soil_profiles');
    }
};
