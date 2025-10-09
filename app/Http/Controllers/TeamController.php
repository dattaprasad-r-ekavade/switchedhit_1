<?php

namespace App\Http\Controllers;

use App\Services\TeamService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function __construct(
        private TeamService $teamService
    ) {
    }
    /**
     * Display the user's team and all players
     */
    public function index()
    {
        $user = Auth::user();
        $team = $user->team()->with('players')->first();

        if (!$team) {
            return redirect()->route('dashboard')->with('error', 'No team found. Please contact support.');
        }

        return Inertia::render('team/index', [
            'team' => $team,
        ]);
    }

    /**
     * Display a specific player's details
     */
    public function show($id)
    {
        $user = Auth::user();
        $team = $user->team;
        
        if (!$team) {
            return redirect()->route('dashboard')->with('error', 'No team found.');
        }

        $player = $team->players()->findOrFail($id);

        return Inertia::render('team/player', [
            'player' => $player,
            'team' => $team,
        ]);
    }

    /**
     * Show the team onboarding form
     */
    public function onboarding()
    {
        $user = Auth::user();
        $team = $user->team;

        if (!$team) {
            return redirect()->route('dashboard')->with('error', 'No team found. Please contact support.');
        }

        return Inertia::render('team/onboarding', [
            'team' => $team,
        ]);
    }

    /**
     * Save team details from onboarding
     */
    public function saveOnboarding(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'home_ground_name' => 'required|string|max:255',
            'pitch_type' => 'required|in:green,flat,dry,damp,sporting',
            'home_color_primary' => 'required|string|max:7',
            'home_color_secondary' => 'required|string|max:7',
        ]);

        $user = Auth::user();
        $team = $user->team;

        if (!$team) {
            return redirect()->route('dashboard')->with('error', 'No team found.');
        }

        $this->teamService->updateTeamDetails($team, $validated);

        return redirect()->route('dashboard')->with('success', 'Team setup completed successfully!');
    }

    /**
     * Show the team edit form
     */
    public function edit()
    {
        $user = Auth::user();
        $team = $user->team;

        if (!$team) {
            return redirect()->route('dashboard')->with('error', 'No team found.');
        }

        return Inertia::render('team/edit', [
            'team' => $team,
        ]);
    }

    /**
     * Update team details
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'home_ground_name' => 'required|string|max:255',
            'pitch_type' => 'required|in:green,flat,dry,damp,sporting',
            'home_color_primary' => 'required|string|max:7',
            'home_color_secondary' => 'required|string|max:7',
        ]);

        $user = Auth::user();
        $team = $user->team;

        if (!$team) {
            return redirect()->route('dashboard')->with('error', 'No team found.');
        }

        $this->teamService->updateTeamDetails($team, $validated);

        return redirect()->route('team.edit')->with('success', 'Team details updated successfully!');
    }
}
