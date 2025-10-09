<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->integer('age');
            $table->integer('jersey_no');
            $table->enum('player_type', ['Bat', 'Bowl', 'WK', 'Allrounder']);
            $table->enum('bat_hand', ['Left', 'Right']);
            $table->enum('batting_order', ['Top', 'Middle', 'Lower']);
            $table->enum('bowl_hand', ['Left', 'Right'])->nullable();
            $table->enum('bowl_type', ['Spin', 'Swing'])->nullable();
            $table->integer('bat_vs_seam')->default(0);
            $table->integer('bat_vs_spin')->default(0);
            $table->integer('seam_bowling')->default(0);
            $table->integer('spin_bowling')->default(0);
            $table->integer('wicketkeeping')->default(0);
            $table->integer('fielding')->default(0);
            $table->integer('fitness')->default(0);
            $table->integer('morale')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
