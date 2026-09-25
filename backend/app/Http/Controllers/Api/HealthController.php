<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class HealthController extends Controller
{
    /**
     * Simple health check for frontend connectivity tests.
     */
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'status' => 'ok',
            'message' => 'AgroOrbit API is running',
            'app' => config('app.name'),
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
