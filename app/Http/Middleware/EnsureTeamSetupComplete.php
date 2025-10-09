<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTeamSetupComplete
{
    /**
     * Handle an incoming request.
     * Redirect to onboarding if team setup is not complete
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        // If user is authenticated, check if team setup is complete
        if ($user && $user->team) {
            // Skip check if already on onboarding page
            if (!$request->routeIs('team.onboarding') && !$request->routeIs('team.save-onboarding')) {
                if (!$user->team->isSetupComplete()) {
                    return redirect()->route('team.onboarding');
                }
            }
        }

        return $next($request);
    }
}
