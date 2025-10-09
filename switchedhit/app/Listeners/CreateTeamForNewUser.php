<?php

namespace App\Listeners;

use App\Services\TeamService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateTeamForNewUser
{
    /**
     * Create the event listener.
     */
    public function __construct(
        private TeamService $teamService
    ) {
    }

    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        // Create a team with 15 players for the newly registered user
        $this->teamService->createTeamForUser($event->user);
    }
}
