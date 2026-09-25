<?php

namespace App\Providers;

use App\Contracts\NASADataProvider;
use App\Services\NASA\NASAPowerProvider;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(NASADataProvider::class, NASAPowerProvider::class);
    }

    public function boot(): void
    {
        //
    }
}
