# Team Onboarding & Settings - Implementation Guide

## Overview
This implementation adds a comprehensive onboarding flow where new users set up their team details (name, stadium, pitch type, colors) after registration. It also allows users to edit these details later.

## What Was Implemented

### 1. Database Changes

#### Migration: `make_team_details_nullable`
Made the following fields nullable in the `teams` table:
- `name`
- `home_ground_name`
- `pitch_type`
- `home_color_primary`
- `home_color_secondary`

This allows creating a team shell first, then filling details during onboarding.

### 2. Backend Changes

#### Updated: `TeamService.php`
- **Modified `createTeamForUser()`**: Now creates team with null values instead of auto-generating
- **Added `updateTeamDetails()`**: New method to update team details with validation

```php
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
```

#### Updated: `Team.php` Model
- **Added `isSetupComplete()`**: Helper method to check if all required fields are filled

```php
public function isSetupComplete(): bool
{
    return !empty($this->name) 
        && !empty($this->home_ground_name) 
        && !empty($this->pitch_type) 
        && !empty($this->home_color_primary) 
        && !empty($this->home_color_secondary);
}
```

#### Created: `EnsureTeamSetupComplete` Middleware
Redirects users to onboarding if team setup is incomplete:
- Checks if team details are filled
- Skips check for onboarding routes themselves
- Protects all other authenticated routes

#### Updated: `TeamController.php`
Added new methods:

1. **`onboarding()`**: Shows the onboarding form
2. **`saveOnboarding(Request $request)`**: Processes onboarding form submission
3. **`edit()`**: Shows team edit form
4. **`update(Request $request)`**: Processes team updates

All methods include validation:
```php
$validated = $request->validate([
    'name' => 'required|string|max:255',
    'home_ground_name' => 'required|string|max:255',
    'pitch_type' => 'required|in:green,flat,dry,damp,sporting',
    'home_color_primary' => 'required|string|max:7',
    'home_color_secondary' => 'required|string|max:7',
]);
```

### 3. Routes Updated (`routes/web.php`)

```php
Route::middleware(['auth', 'verified'])->group(function () {
    // Onboarding routes (no setup check)
    Route::get('team/onboarding', [TeamController::class, 'onboarding'])->name('team.onboarding');
    Route::post('team/onboarding', [TeamController::class, 'saveOnboarding'])->name('team.save-onboarding');

    // Protected routes (require team setup)
    Route::middleware(['App\Http\Middleware\EnsureTeamSetupComplete'])->group(function () {
        Route::get('dashboard', ...)->name('dashboard');
        Route::get('team', ...)->name('team.index');
        Route::get('team/player/{id}', ...)->name('team.player');
        Route::get('team/edit', [TeamController::class, 'edit'])->name('team.edit');
        Route::put('team/edit', [TeamController::class, 'update'])->name('team.update');
    });
});
```

### 4. Frontend Pages Created

#### Onboarding Page (`resources/js/pages/team/onboarding.tsx`)
**Features:**
- Welcome screen with welcoming message
- Full-screen centered card layout
- Form fields:
  - Team Name (text input)
  - Home Stadium Name (text input)
  - Pitch Type (dropdown select with descriptions)
  - Primary Color (color picker + hex input)
  - Secondary Color (color picker + hex input)
- Live color preview showing both colors
- Client-side and server-side validation
- Beautiful gradient background
- Responsive design

**Pitch Type Options:**
- Green - Favours fast bowlers
- Flat - Balanced for batting and bowling
- Dry - Favours spin bowlers
- Damp - Good for swing bowling
- Sporting - Assistance for all

**Color Input:**
- Visual color picker for easy selection
- Text input for hex codes
- Pattern validation for hex format (#RRGGBB)
- Live preview of selected colors

#### Team Edit Page (`resources/js/pages/team/edit.tsx`)
**Features:**
- Same form fields as onboarding
- Integrated within main app layout with sidebar
- Breadcrumb navigation
- Success message on save
- Pre-filled with existing team data
- Cancel button to go back
- Save button with loading state
- All the same validation and features as onboarding

#### Updated Dashboard (`resources/js/pages/dashboard.tsx`)
**New Feature:**
- "Edit Team Settings →" link added to Home Stadium card
- Quick access to edit team details without leaving dashboard

## User Flow

### First-Time User Registration

1. **User registers** → Account created
2. **Team & players created** → Team has null details, 15 players generated
3. **User logs in** → Middleware detects incomplete team setup
4. **Redirected to onboarding** → `/team/onboarding`
5. **User fills team details** → Name, stadium, pitch type, colors
6. **Submit form** → Details saved to database
7. **Redirected to dashboard** → Can now access all features

### Existing User Editing Team

1. **User on dashboard** → Sees "Edit Team Settings" link
2. **Clicks link** → Navigates to `/team/edit`
3. **Edit form shown** → Pre-filled with current values
4. **User updates fields** → Changes colors, stadium, etc.
5. **Clicks "Save Changes"** → Updates saved
6. **Success message shown** → Confirmation displayed
7. **Changes reflected** → Dashboard and all views updated

## Validation Rules

All fields are required:

| Field | Type | Validation |
|-------|------|------------|
| Team Name | String | Required, max 255 characters |
| Home Stadium | String | Required, max 255 characters |
| Pitch Type | Enum | Required, one of: green, flat, dry, damp, sporting |
| Primary Color | String | Required, max 7 chars, hex format (#RRGGBB) |
| Secondary Color | String | Required, max 7 chars, hex format (#RRGGBB) |

## Middleware Protection

The `EnsureTeamSetupComplete` middleware ensures users complete onboarding before accessing:
- Dashboard
- Team roster
- Player details
- Team edit page
- Any other authenticated feature

**Exceptions:**
- Onboarding page itself (`/team/onboarding`)
- Onboarding save endpoint (`POST /team/onboarding`)

## UI/UX Features

### Onboarding Page
- ✅ Full-screen centered design
- ✅ Welcoming icon and message
- ✅ Clean, modern card layout
- ✅ Gradient background
- ✅ Clear field labels with descriptions
- ✅ Color pickers with visual feedback
- ✅ Live color preview
- ✅ Pattern validation for hex codes
- ✅ Disabled submit during processing
- ✅ Note about editing later

### Edit Page
- ✅ Integrated with main app layout
- ✅ Breadcrumb navigation
- ✅ Success message after save
- ✅ Pre-filled form fields
- ✅ Cancel button
- ✅ Loading states
- ✅ Same validation as onboarding
- ✅ Consistent styling

### Dashboard Integration
- ✅ "Edit Team Settings" link in stadium card
- ✅ Seamless access to edit page
- ✅ Team colors displayed throughout

## Files Created/Modified

### Created:
- `database/migrations/2025_10_09_105012_make_team_details_nullable.php`
- `app/Http/Middleware/EnsureTeamSetupComplete.php`
- `resources/js/pages/team/onboarding.tsx`
- `resources/js/pages/team/edit.tsx`

### Modified:
- `app/Services/TeamService.php`
  - Modified `createTeamForUser()` method
  - Added `updateTeamDetails()` method
- `app/Models/Team.php`
  - Added `isSetupComplete()` method
- `app/Http/Controllers/TeamController.php`
  - Added `onboarding()` method
  - Added `saveOnboarding()` method
  - Added `edit()` method
  - Added `update()` method
- `routes/web.php`
  - Added onboarding routes
  - Added edit routes
  - Applied middleware to protected routes
- `resources/js/pages/dashboard.tsx`
  - Added "Edit Team Settings" link

## Testing Guide

### Test New User Onboarding

1. **Register a new user**
2. **Expected:** Redirected to `/team/onboarding` after login
3. **Fill out the form:**
   - Team Name: "Test Warriors"
   - Stadium: "Test Stadium"
   - Pitch Type: Select "Flat"
   - Colors: Choose any colors
4. **Submit form**
5. **Expected:** Redirected to dashboard with team info displayed

### Test Editing Existing Team

1. **Login as existing user** with completed team
2. **Go to dashboard**
3. **Click "Edit Team Settings →"** in stadium card
4. **Expected:** Form pre-filled with current values
5. **Change team name** or colors
6. **Click "Save Changes"**
7. **Expected:** Success message shown
8. **Go back to dashboard**
9. **Expected:** Changes reflected

### Test Middleware Protection

1. **Register new user** (team not setup)
2. **Try accessing `/dashboard` directly**
3. **Expected:** Redirected to `/team/onboarding`
4. **Try accessing `/team` directly**
5. **Expected:** Redirected to `/team/onboarding`
6. **Complete onboarding**
7. **Expected:** Can now access all routes

## Benefits

✅ **User Control**: Users choose their own team identity
✅ **Required Setup**: Ensures all users complete team setup
✅ **Flexible**: Can edit team details anytime
✅ **Good UX**: Beautiful, intuitive forms with live previews
✅ **Validation**: Both client and server-side validation
✅ **Protection**: Middleware ensures onboarding completion
✅ **Responsive**: Works on all screen sizes
✅ **Consistent**: Same design language throughout app

## Future Enhancements

Possible additions:
- Team logo upload
- Multiple stadium options
- Team kit designer
- Team bio/description field
- Formation preference
- Captain selection
- Team motto/slogan
- Social media links
