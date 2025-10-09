<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'home_ground_name',
        'pitch_type',
        'home_color_primary',
        'home_color_secondary',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function players(): HasMany
    {
        return $this->hasMany(Player::class);
    }

    /**
     * Check if team setup is complete
     */
    public function isSetupComplete(): bool
    {
        return !empty($this->name) 
            && !empty($this->home_ground_name) 
            && !empty($this->pitch_type) 
            && !empty($this->home_color_primary) 
            && !empty($this->home_color_secondary);
    }
}
