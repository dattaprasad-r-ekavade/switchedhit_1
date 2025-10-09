<?php

namespace App\Services;

use App\Models\Player;
use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class TeamService
{
    /**
     * Create a team with 15 players for a new user
     * Team details will be filled during onboarding
     */
    public function createTeamForUser(User $user): Team
    {
        // Create the team with null values - user will fill these during onboarding
        $team = Team::create([
            'user_id' => $user->id,
            'name' => null,
            'home_ground_name' => null,
            'pitch_type' => null,
            'home_color_primary' => null,
            'home_color_secondary' => null,
        ]);

        // Fetch 15 player names from randomuser.me API
        $playerNames = $this->fetchRandomPlayerNames();

        // Create 15 players with random stats
        $this->createPlayers($team, $playerNames);

        return $team;
    }

    /**
     * Fetch 15 random player names from randomuser.me API
     */
    private function fetchRandomPlayerNames(): array
    {
        try {
            $response = Http::get('https://randomuser.me/api/', [
                'inc' => 'name',
                'nat' => 'in',
                'results' => 15,
                'gender' => 'male',
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return array_map(function ($result) {
                    return $result['name']['first'] . ' ' . $result['name']['last'];
                }, $data['results']);
            }
        } catch (\Exception $e) {
            // Log error and continue with fallback
            \Log::error('Failed to fetch player names from API: ' . $e->getMessage());
        }

        // Fallback to generated names if API fails
        return $this->generateFallbackPlayerNames();
    }

    /**
     * Generate fallback player names if API fails
     */
    private function generateFallbackPlayerNames(): array
    {
        $firstNames = ['Rahul', 'Virat', 'Rohit', 'Sachin', 'Dhoni', 'Kapil', 'Sourav', 'Yuvraj', 'Harbhajan', 'Zaheer', 'Ashwin', 'Bumrah', 'Shami', 'Jadeja', 'Hardik'];
        $lastNames = ['Kumar', 'Sharma', 'Singh', 'Patel', 'Shah', 'Verma', 'Reddy', 'Yadav', 'Gupta', 'Joshi', 'Iyer', 'Nair', 'Das', 'Roy', 'Pandey'];

        $names = [];
        for ($i = 0; $i < 15; $i++) {
            $names[] = $firstNames[$i] . ' ' . $lastNames[array_rand($lastNames)];
        }
        return $names;
    }

    /**
     * Create 15 players for the team
     */
    private function createPlayers(Team $team, array $playerNames): void
    {
        $usedJerseyNumbers = [];
        
        // Define player type distribution
        $playerTypes = [
            'Bat', 'Bat', 'Bat', 'Bat',  // 4 batsmen
            'Bowl', 'Bowl', 'Bowl', 'Bowl',  // 4 bowlers
            'Allrounder', 'Allrounder', 'Allrounder',  // 3 all-rounders
            'WK', 'WK',  // 2 wicketkeepers
            'Bat', 'Bowl'  // 2 more to make 15
        ];

        shuffle($playerTypes);

        foreach ($playerNames as $index => $name) {
            $playerType = $playerTypes[$index];
            
            // Generate unique jersey number
            do {
                $jerseyNo = rand(1, 99);
            } while (in_array($jerseyNo, $usedJerseyNumbers));
            $usedJerseyNumbers[] = $jerseyNo;

            $bowlType = in_array($playerType, ['Bowl', 'Allrounder']) ? $this->getRandomBowlType() : null;
            
            Player::create([
                'team_id' => $team->id,
                'name' => $name,
                'age' => rand(18, 40),
                'jersey_no' => $jerseyNo,
                'player_type' => $playerType,
                'bat_hand' => $this->getRandomHand(),
                'batting_order' => $this->getBattingOrder($playerType),
                'bowl_hand' => in_array($playerType, ['Bowl', 'Allrounder']) ? $this->getRandomHand() : null,
                'bowl_type' => $bowlType,
                'bat_vs_seam' => $this->getBattingStat($playerType),
                'bat_vs_spin' => $this->getBattingStat($playerType),
                'seam_bowling' => $this->getBowlingStat($playerType, $bowlType, 'Swing'),
                'spin_bowling' => $this->getBowlingStat($playerType, $bowlType, 'Spin'),
                'wicketkeeping' => $playerType === 'WK' ? rand(60, 95) : rand(0, 30),
                'fielding' => rand(40, 95),
                'fitness' => rand(50, 100),
                'morale' => rand(60, 90),
            ]);
        }
    }

    /**
     * Generate random team name
     */
    private function generateTeamName(): string
    {
        $cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Jaipur', 'Lucknow', 'Ahmedabad'];
        $suffixes = ['Warriors', 'Knights', 'Riders', 'Challengers', 'Kings', 'Royals', 'Titans', 'Super Giants', 'Capitals'];
        
        return $cities[array_rand($cities)] . ' ' . $suffixes[array_rand($suffixes)];
    }

    /**
     * Generate random stadium name
     */
    private function generateStadiumName(): string
    {
        $stadiums = [
            'Wankhede Stadium',
            'Eden Gardens',
            'M. Chinnaswamy Stadium',
            'MA Chidambaram Stadium',
            'Feroz Shah Kotla',
            'Rajiv Gandhi International Stadium',
            'Narendra Modi Stadium',
            'Green Park Stadium',
            'Sawai Mansingh Stadium',
            'Punjab Cricket Association Stadium'
        ];
        
        return $stadiums[array_rand($stadiums)];
    }

    /**
     * Get random pitch type
     */
    private function getRandomPitchType(): string
    {
        $pitchTypes = ['green', 'flat', 'dry', 'damp', 'sporting'];
        return $pitchTypes[array_rand($pitchTypes)];
    }

    /**
     * Generate random team colors
     */
    private function generateTeamColors(): array
    {
        $colors = [
            '#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF',
            '#00FFFF', '#FFA500', '#800080', '#008000', '#000080',
            '#FF1493', '#1E90FF', '#32CD32', '#FFD700', '#DC143C'
        ];
        
        $primary = $colors[array_rand($colors)];
        $secondary = $colors[array_rand($colors)];
        
        // Ensure secondary is different from primary
        while ($secondary === $primary) {
            $secondary = $colors[array_rand($colors)];
        }
        
        return [
            'primary' => $primary,
            'secondary' => $secondary,
        ];
    }

    /**
     * Get random hand (Left/Right)
     */
    private function getRandomHand(): string
    {
        return rand(0, 100) < 20 ? 'Left' : 'Right';  // 20% left-handed
    }

    /**
     * Get random bowl type
     */
    private function getRandomBowlType(): string
    {
        return rand(0, 1) ? 'Spin' : 'Swing';
    }

    /**
     * Get batting order based on player type
     */
    private function getBattingOrder(string $playerType): string
    {
        if ($playerType === 'Bat') {
            return ['Top', 'Middle'][array_rand(['Top', 'Middle'])];
        } elseif ($playerType === 'WK') {
            return ['Top', 'Middle'][array_rand(['Top', 'Middle'])];
        } elseif ($playerType === 'Allrounder') {
            return 'Middle';
        } else {
            return 'Lower';
        }
    }

    /**
     * Get batting stat based on player type
     */
    private function getBattingStat(string $playerType): int
    {
        switch ($playerType) {
            case 'Bat':
            case 'WK':
                return rand(60, 95);
            case 'Allrounder':
                return rand(50, 80);
            case 'Bowl':
                return rand(20, 50);
            default:
                return rand(30, 60);
        }
    }

    /**
     * Get bowling stat based on player type and bowl type
     */
    private function getBowlingStat(string $playerType, ?string $playerBowlType, string $statBowlType): int
    {
        if (!in_array($playerType, ['Bowl', 'Allrounder'])) {
            return rand(0, 30);
        }

        // If the player's bowl type matches the stat type, they get higher stats
        $isSpecialty = $playerBowlType === $statBowlType;

        if ($playerType === 'Bowl') {
            return $isSpecialty ? rand(60, 95) : rand(20, 50);
        } else {  // Allrounder
            return $isSpecialty ? rand(50, 80) : rand(20, 45);
        }
    }

    /**
     * Update team details
     */
    public function updateTeamDetails(Team $team, array $data): Team
    {
        $team->update([
            'name' => $data['name'],
            'home_ground_name' => $data['home_ground_name'],
            'pitch_type' => $data['pitch_type'],
            'home_color_primary' => $data['home_color_primary'],
            'home_color_secondary' => $data['home_color_secondary'],
        ]);

        return $team->fresh();
    }
}
