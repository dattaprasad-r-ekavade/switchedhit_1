import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Team Roster',
        href: '/team',
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
    home_ground_name: string;
    pitch_type: string;
    home_color_primary: string;
    home_color_secondary: string;
    players: Player[];
}

interface TeamIndexProps {
    team: Team;
}

export default function TeamIndex({ team }: TeamIndexProps) {
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

    const getBattingOrderColor = (order: string) => {
        switch (order) {
            case 'Top':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'Middle':
                return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
            case 'Lower':
                return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getStatBar = (value: number) => {
        const percentage = Math.max(0, Math.min(100, value));
        let colorClass = 'bg-red-500';
        if (percentage >= 70) colorClass = 'bg-green-500';
        else if (percentage >= 50) colorClass = 'bg-yellow-500';
        else if (percentage >= 30) colorClass = 'bg-orange-500';

        return (
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className={`${colorClass} h-2 rounded-full transition-all`} style={{ width: `${percentage}%` }}></div>
            </div>
        );
    };

    // Group players by type
    const playersByType = {
        Bat: team.players.filter(p => p.player_type === 'Bat'),
        Bowl: team.players.filter(p => p.player_type === 'Bowl'),
        Allrounder: team.players.filter(p => p.player_type === 'Allrounder'),
        WK: team.players.filter(p => p.player_type === 'WK'),
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${team.name} - Team Roster`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Team Header */}
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 hover:bg-accent rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-full" style={{ backgroundColor: team.home_color_primary }}></div>
                        <div>
                            <h1 className="text-2xl font-bold">{team.name}</h1>
                            <p className="text-sm text-muted-foreground">{team.players.length} Players</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>Team Roster</span>
                    </div>
                </div>

                {/* Players Grid */}
                <div className="space-y-6">
                    {Object.entries(playersByType).map(([type, players]) => (
                        players.length > 0 && (
                            <div key={type}>
                                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getPlayerTypeColor(type)}`}>
                                        {type === 'WK' ? 'Wicketkeepers' : type === 'Bat' ? 'Batsmen' : type === 'Bowl' ? 'Bowlers' : 'All-rounders'}
                                    </span>
                                    <span className="text-muted-foreground text-sm">({players.length})</span>
                                </h2>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {players.map((player) => (
                                        <Link 
                                            key={player.id} 
                                            href={`/team/player/${player.id}`}
                                            className="block rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-lg font-bold">#{player.jersey_no}</span>
                                                        <h3 className="font-semibold">{player.name}</h3>
                                                    </div>
                                                    <div className="flex gap-2 flex-wrap">
                                                        <span className={`px-2 py-0.5 rounded text-xs ${getPlayerTypeColor(player.player_type)}`}>
                                                            {player.player_type}
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded text-xs ${getBattingOrderColor(player.batting_order)}`}>
                                                            {player.batting_order} Order
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right text-sm text-muted-foreground">
                                                    {player.age} yrs
                                                </div>
                                            </div>

                                            <div className="space-y-2 text-xs">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-muted-foreground">Batting</span>
                                                    <span className="font-medium">{Math.round((player.bat_vs_seam + player.bat_vs_spin) / 2)}</span>
                                                </div>
                                                {getStatBar(Math.round((player.bat_vs_seam + player.bat_vs_spin) / 2))}

                                                {(player.player_type === 'Bowl' || player.player_type === 'Allrounder') && (
                                                    <>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-muted-foreground">Bowling</span>
                                                            <span className="font-medium">{Math.round((player.seam_bowling + player.spin_bowling) / 2)}</span>
                                                        </div>
                                                        {getStatBar(Math.round((player.seam_bowling + player.spin_bowling) / 2))}
                                                    </>
                                                )}

                                                {player.player_type === 'WK' && (
                                                    <>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-muted-foreground">Wicketkeeping</span>
                                                            <span className="font-medium">{player.wicketkeeping}</span>
                                                        </div>
                                                        {getStatBar(player.wicketkeeping)}
                                                    </>
                                                )}

                                                <div className="flex items-center justify-between">
                                                    <span className="text-muted-foreground">Fitness</span>
                                                    <span className="font-medium">{player.fitness}</span>
                                                </div>
                                                {getStatBar(player.fitness)}

                                                <div className="flex items-center justify-between">
                                                    <span className="text-muted-foreground">Morale</span>
                                                    <span className="font-medium">{player.morale}</span>
                                                </div>
                                                {getStatBar(player.morale)}
                                            </div>

                                            <div className="mt-3 pt-3 border-t border-sidebar-border/50 flex gap-2 text-xs text-muted-foreground">
                                                <span>🏏 {player.bat_hand}</span>
                                                {player.bowl_hand && <span>⚾ {player.bowl_hand} {player.bowl_type}</span>}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
