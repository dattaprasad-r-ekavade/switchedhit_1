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
        Schema::table('teams', function (Blueprint $table) {
            $table->string('name')->nullable()->change();
            $table->string('home_ground_name')->nullable()->change();
            $table->enum('pitch_type', ['green', 'flat', 'dry', 'damp', 'sporting'])->nullable()->change();
            $table->string('home_color_primary')->nullable()->change();
            $table->string('home_color_secondary')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('teams', function (Blueprint $table) {
            $table->string('name')->nullable(false)->change();
            $table->string('home_ground_name')->nullable(false)->change();
            $table->enum('pitch_type', ['green', 'flat', 'dry', 'damp', 'sporting'])->nullable(false)->change();
            $table->string('home_color_primary')->nullable(false)->change();
            $table->string('home_color_secondary')->nullable(false)->change();
        });
    }
};
