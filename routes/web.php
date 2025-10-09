<?php

use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Team onboarding (no middleware check for these routes)
    Route::get('team/onboarding', [TeamController::class, 'onboarding'])->name('team.onboarding');
    Route::post('team/onboarding', [TeamController::class, 'saveOnboarding'])->name('team.save-onboarding');

    // Routes that require team setup to be complete
    Route::middleware(['App\Http\Middleware\EnsureTeamSetupComplete'])->group(function () {
        Route::get('dashboard', function () {
            $user = auth()->user();
            $team = $user->team()->with('players')->first();
            
            return Inertia::render('dashboard', [
                'team' => $team,
            ]);
        })->name('dashboard');

        // Team routes
        Route::get('team', [TeamController::class, 'index'])->name('team.index');
        Route::get('team/player/{id}', [TeamController::class, 'show'])->name('team.player');
        Route::get('team/edit', [TeamController::class, 'edit'])->name('team.edit');
        Route::put('team/edit', [TeamController::class, 'update'])->name('team.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
