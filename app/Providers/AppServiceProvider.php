<?php

namespace App\Providers;

use App\Listeners\CreateTeamForNewUser;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS in production (for Render.com and other platforms)
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        // Register event listener for user registration
        Event::listen(
            Registered::class,
            CreateTeamForNewUser::class,
        );
    }
}
