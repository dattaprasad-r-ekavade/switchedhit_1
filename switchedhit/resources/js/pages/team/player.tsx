import { PlayerJersey } from '@/components/PlayerJersey';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Team Roster',
        href: '/team',
    },
    {
        title: 'Player Details',
        href: '#',
    },
];

interface Player {
    id: number;
    name: string;
    age: number;
    jersey_no: number;
    player_type: string;
    bat_hand: string;
    batting_order: string;
    bowl_hand?: string;
    bowl_type?: string;
    bat_vs_seam: number;
    bat_vs_spin: number;
    seam_bowling: number;
    spin_bowling: number;
    wicketkeeping: number;
    fielding: number;
    fitness: number;
    morale: number;
}

interface Team {
    id: number;
    name: string;
    home_color_primary: string;
    home_color_secondary: string;
}

interface PlayerDetailProps {
    player: Player;
    team: Team;
}

export default function PlayerDetail({ player, team }: PlayerDetailProps) {
    const getPlayerTypeColor = (type: string) => {
        switch (type) {
            case 'Bat':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'Bowl':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'Allrounder':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'WK':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getStatColor = (value: number) => {
        if (value >= 80) return 'text-green-600 dark:text-green-400';
        if (value >= 60) return 'text-lime-600 dark:text-lime-400';
        if (value >= 40) return 'text-yellow-600 dark:text-yellow-400';
        if (value >= 20) return 'text-orange-600 dark:text-orange-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getStatIcon = (value: number) => {
        if (value >= 70) return <TrendingUp className="w-4 h-4 text-green-500" />;
        if (value >= 40) return <Minus className="w-4 h-4 text-yellow-500" />;
        return <TrendingDown className="w-4 h-4 text-red-500" />;
    };

    const StatBar = ({ label, value, maxValue = 100 }: { label: string; value: number; maxValue?: number }) => {
        const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
        let colorClass = 'bg-red-500';
        if (percentage >= 70) colorClass = 'bg-green-500';
        else if (percentage >= 50) colorClass = 'bg-yellow-500';
        else if (percentage >= 30) colorClass = 'bg-orange-500';

        return (
            <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className={`font-bold ${getStatColor(value)}`}>{value}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className={`${colorClass} h-3 rounded-full transition-all`} style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${player.name} - Player Details`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Player Header */}
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/team" className="p-2 hover:bg-accent rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">{player.name}</h1>
                        <p className="text-sm text-muted-foreground">{team.name}</p>
                    </div>
                </div>

                {/* Jersey Display */}
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        {/* Front Jersey */}
                        <div className="text-center">
                            <PlayerJersey
                                teamName={team.name}
                                playerName={player.name}
                                jerseyNumber={player.jersey_no}
                                primaryColor={team.home_color_primary}
                                secondaryColor={team.home_color_secondary}
                                view="front"
                                size="lg"
                            />
                            <p className="text-xs text-muted-foreground mt-2">Front</p>
                        </div>

                        {/* Back Jersey */}
                        <div className="text-center">
                            <PlayerJersey
                                teamName={team.name}
                                playerName={player.name}
                                jerseyNumber={player.jersey_no}
                                primaryColor={team.home_color_primary}
                                secondaryColor={team.home_color_secondary}
                                view="back"
                                size="lg"
                            />
                            <p className="text-xs text-muted-foreground mt-2">Back</p>
                        </div>
                    </div>
                </div>

                {/* Player Overview Card */}
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                    <div className="flex flex-col md:flex-row gap-6">

                        {/* Player Info */}
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Player Type</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPlayerTypeColor(player.player_type)}`}>
                                    {player.player_type === 'WK' ? 'Wicketkeeper' : player.player_type === 'Bat' ? 'Batsman' : player.player_type === 'Bowl' ? 'Bowler' : 'All-rounder'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Age</p>
                                <p className="text-lg font-semibold">{player.age} years</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Batting Order</p>
                                <p className="text-lg font-semibold capitalize">{player.batting_order}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Batting Hand</p>
                                <p className="text-lg font-semibold">{player.bat_hand} Handed</p>
                            </div>
                            {player.bowl_hand && (
                                <>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Bowling Hand</p>
                                        <p className="text-lg font-semibold">{player.bowl_hand} Arm</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Bowling Type</p>
                                        <p className="text-lg font-semibold">{player.bowl_type}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Batting Stats */}
                    <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            🏏 Batting Skills
                        </h2>
                        <div className="space-y-4">
                            <StatBar label="Batting vs Seam" value={player.bat_vs_seam} />
                            <StatBar label="Batting vs Spin" value={player.bat_vs_spin} />
                            <div className="pt-2 mt-2 border-t border-sidebar-border/50">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold">Overall Batting</span>
                                    <span className={`text-2xl font-bold ${getStatColor(Math.round((player.bat_vs_seam + player.bat_vs_spin) / 2))}`}>
                                        {Math.round((player.bat_vs_seam + player.bat_vs_spin) / 2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bowling Stats */}
                    <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            ⚾ Bowling Skills
                        </h2>
                        <div className="space-y-4">
                            <StatBar label="Seam Bowling" value={player.seam_bowling} />
                            <StatBar label="Spin Bowling" value={player.spin_bowling} />
                            <div className="pt-2 mt-2 border-t border-sidebar-border/50">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold">Overall Bowling</span>
                                    <span className={`text-2xl font-bold ${getStatColor(Math.round((player.seam_bowling + player.spin_bowling) / 2))}`}>
                                        {Math.round((player.seam_bowling + player.spin_bowling) / 2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fielding Stats */}
                    <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            🧤 Fielding Skills
                        </h2>
                        <div className="space-y-4">
                            <StatBar label="Fielding" value={player.fielding} />
                            <StatBar label="Wicketkeeping" value={player.wicketkeeping} />
                        </div>
                    </div>

                    {/* Physical & Mental Stats */}
                    <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            💪 Physical & Mental
                        </h2>
                        <div className="space-y-4">
                            <StatBar label="Fitness" value={player.fitness} />
                            <StatBar label="Morale" value={player.morale} />
                        </div>
                    </div>
                </div>

                {/* Overall Rating */}
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold mb-1">Overall Player Rating</h2>
                            <p className="text-sm text-muted-foreground">Based on all attributes</p>
                        </div>
                        <div className="text-center">
                            <div className={`text-5xl font-bold ${getStatColor(Math.round((
                                player.bat_vs_seam + 
                                player.bat_vs_spin + 
                                player.seam_bowling + 
                                player.spin_bowling + 
                                player.wicketkeeping + 
                                player.fielding + 
                                player.fitness + 
                                player.morale
                            ) / 8))}`}>
                                {Math.round((
                                    player.bat_vs_seam + 
                                    player.bat_vs_spin + 
                                    player.seam_bowling + 
                                    player.spin_bowling + 
                                    player.wicketkeeping + 
                                    player.fielding + 
                                    player.fitness + 
                                    player.morale
                                ) / 8)}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">out of 100</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
