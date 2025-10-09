<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Player extends Model
{
    protected $fillable = [
        'team_id',
        'name',
        'age',
        'jersey_no',
        'player_type',
        'bat_hand',
        'batting_order',
        'bowl_hand',
        'bowl_type',
        'bat_vs_seam',
        'bat_vs_spin',
        'seam_bowling',
        'spin_bowling',
        'wicketkeeping',
        'fielding',
        'fitness',
        'morale',
    ];

    protected $casts = [
        'age' => 'integer',
        'jersey_no' => 'integer',
        'bat_vs_seam' => 'integer',
        'bat_vs_spin' => 'integer',
        'seam_bowling' => 'integer',
        'spin_bowling' => 'integer',
        'wicketkeeping' => 'integer',
        'fielding' => 'integer',
        'fitness' => 'integer',
        'morale' => 'integer',
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
