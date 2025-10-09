# Team and Player Creation on User Registration

This feature automatically creates a team with 15 players when a new user registers in the application.

## What Was Implemented

### Database Structure

#### Teams Table
- `id` - Primary key
- `user_id` - Foreign key to users table
- `name` - Team name (auto-generated)
- `home_ground_name` - Stadium name (auto-generated)
- `pitch_type` - Enum: green, flat, dry, damp, sporting
- `home_color_primary` - Hex color code
- `home_color_secondary` - Hex color code
- `timestamps` - created_at, updated_at

#### Players Table
- `id` - Primary key
- `team_id` - Foreign key to teams table
- `name` - Player name (fetched from randomuser.me API)
- `age` - Integer (18-40)
- `jersey_no` - Integer (1-99, unique per team)
- `player_type` - Enum: Bat, Bowl, WK, Allrounder
- `bat_hand` - Enum: Left, Right
- `batting_order` - Enum: Top, Middle, Lower
- `bowl_hand` - Enum: Left, Right (nullable)
- `bowl_type` - Enum: Spin, Swing (nullable)
- `bat_vs_seam` - Integer (0-100)
- `bat_vs_spin` - Integer (0-100)
- `seam_bowling` - Integer (0-100)
- `spin_bowling` - Integer (0-100)
- `wicketkeeping` - Integer (0-100)
- `fielding` - Integer (0-100)
- `fitness` - Integer (0-100)
- `morale` - Integer (0-100)
- `timestamps` - created_at, updated_at

### Models Created

1. **Team Model** (`app/Models/Team.php`)
   - Relationship with User (belongsTo)
   - Relationship with Players (hasMany)

2. **Player Model** (`app/Models/Player.php`)
   - Relationship with Team (belongsTo)
   - All stats are properly cast to integers

3. **Updated User Model**
   - Added relationship with Team (hasOne)

### Service Layer

**TeamService** (`app/Services/TeamService.php`)
- Main service for creating teams and players
- Fetches player names from https://randomuser.me/api/ with Indian names (male)
- Generates realistic stats based on player type:
  - **Batsmen**: High batting stats (60-95), low bowling stats
  - **Bowlers**: High bowling stats (60-95), low batting stats
  - **All-rounders**: Balanced stats (50-80)
  - **Wicketkeepers**: High batting and wicketkeeping stats
- Smart bowling stat generation:
  - Spin bowlers get high spin bowling stats, lower seam stats
  - Swing bowlers get high seam bowling stats, lower spin stats
- Generates random team names, stadiums, and colors

### Event Handling

**CreateTeamForNewUser Listener** (`app/Listeners/CreateTeamForNewUser.php`)
- Listens to the `Illuminate\Auth\Events\Registered` event
- Automatically triggers team creation when a user registers
- Registered in `AppServiceProvider`

### Player Distribution
Each team gets 15 players with the following distribution:
- 4-5 Batsmen
- 4 Bowlers
- 3 All-rounders
- 2 Wicketkeepers

### Stats Logic

#### Batting Stats (bat_vs_seam, bat_vs_spin)
- Batsmen & WK: 60-95
- All-rounders: 50-80
- Bowlers: 20-50

#### Bowling Stats (seam_bowling, spin_bowling)
- Based on player's bowl_type:
  - Spin bowlers: High spin (60-95), low seam (20-50)
  - Swing bowlers: High seam (60-95), low spin (20-50)
- All-rounders get slightly lower stats than pure bowlers
- Non-bowlers get minimal stats (0-30)

#### Other Stats
- Wicketkeeping: High (60-95) for WK, low (0-30) for others
- Fielding: 40-95 (randomized for all players)
- Fitness: 50-100
- Morale: 60-90

### API Integration

The service fetches player names from:
```
https://randomuser.me/api/?inc=name&nat=in&results=15&gender=male
```

If the API fails, it falls back to a predefined list of Indian cricket names.

## How It Works

1. User registers through the registration form
2. Laravel fires the `Registered` event after creating the user
3. The `CreateTeamForNewUser` listener catches this event
4. The `TeamService` is called to:
   - Fetch 15 random Indian male names from randomuser.me API
   - Generate a random team name and stadium
   - Choose random colors and pitch type
   - Create the team in the database
   - Create 15 players with appropriate stats based on their roles
5. The user now has a complete team ready to use

## Files Modified/Created

### Created:
- `database/migrations/2025_10_09_103247_create_teams_table.php`
- `database/migrations/2025_10_09_103253_create_players_table.php`
- `app/Models/Team.php`
- `app/Models/Player.php`
- `app/Services/TeamService.php`
- `app/Listeners/CreateTeamForNewUser.php`

### Modified:
- `app/Models/User.php` - Added team relationship
- `app/Providers/AppServiceProvider.php` - Registered event listener

## Testing

To test the implementation:

1. Register a new user through the application
2. Check the database to verify:
   ```sql
   SELECT * FROM teams WHERE user_id = [new_user_id];
   SELECT * FROM players WHERE team_id = [team_id];
   ```
3. Verify that:
   - One team was created
   - 15 players were created
   - All stats are within expected ranges
   - Jersey numbers are unique
   - Player names are properly fetched

## Future Enhancements

Potential improvements:
- Add team logo upload
- Allow users to customize team name/colors during registration
- Add player photos/avatars
- Implement player training/improvement system
- Add team management interface
- Create player trading/transfer system
