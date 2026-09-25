<?php

namespace App\Contracts;

interface NASADataProvider
{
    /**
     * Fetch normalized observations from one NASA data provider.
     *
     * @return list<array<string, mixed>>
     */
    public function fetch(float $latitude, float $longitude, string $startDate, string $endDate, array $variables): array;
}
