<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nasa_observations', function (Blueprint $table) {
            $table->id();
            $table->string('dataset', 100);
            $table->string('variable', 100);
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->date('observation_date');
            $table->decimal('value', 18, 6);
            $table->string('unit', 50);
            $table->string('source', 255);
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['dataset', 'variable', 'observation_date']);
            $table->index(['latitude', 'longitude', 'observation_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nasa_observations');
    }
};
