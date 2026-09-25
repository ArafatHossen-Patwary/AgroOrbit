<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\NASADataUnavailableException;
use App\Http\Controllers\Controller;
use App\Http\Resources\NASAObservationResource;
use App\Services\NASADataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NASADataController extends Controller
{
    public function __construct(private readonly NASADataService $service)
    {
    }

    /** GET /api/nasa/observations */
    public function index(Request $request): AnonymousResourceCollection|JsonResponse
    {
        $validated = $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'start_date' => ['nullable', 'date_format:Y-m-d', 'before_or_equal:end_date'],
            'end_date' => ['nullable', 'date_format:Y-m-d', 'after_or_equal:start_date'],
            'variables' => ['nullable', 'string'],
        ]);

        $endDate = $validated['end_date'] ?? now()->subDay()->format('Y-m-d');
        $startDate = $validated['start_date'] ?? now()->subDays(7)->format('Y-m-d');
        $variables = isset($validated['variables']) && $validated['variables'] !== ''
            ? array_values(array_filter(array_map('trim', explode(',', $validated['variables']))))
            : config('services.nasa.power.default_variables');

        try {
            $result = $this->service->observations(
                (float) $validated['latitude'],
                (float) $validated['longitude'],
                $startDate,
                $endDate,
                $variables,
            );

            return NASAObservationResource::collection($result['observations'])
                ->additional([
                    'dataset' => 'NASA POWER Daily Point',
                    'status' => $result['status'],
                    'cached' => $result['status'] === 'cached',
                    'endpoint' => rtrim(config('services.nasa.power.base_url'), '/') . '/temporal/daily/point/{latitude}/{longitude}',
                    'variables' => $variables,
                    'date_range' => ['start' => $startDate, 'end' => $endDate],
                ]);
        } catch (NASADataUnavailableException $exception) {
            return response()->json([
                'message' => 'NASA POWER is unavailable and no cached observations exist for this location and date range.',
                'status' => 'unavailable',
                'cached' => false,
            ], 503);
        }
    }
}
