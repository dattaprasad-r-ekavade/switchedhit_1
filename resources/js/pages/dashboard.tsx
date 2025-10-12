import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { PlayerBust } from '@/components/PlayerJersey';
import { ComingSoon } from '@/components/coming-soon';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Users, Home, TrendingUp, Trophy } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Team {
    id: number;
    name: string;
    home_ground_name: string;
    pitch_type: string;
    home_color_primary: string;
    home_color_secondary: string;
    players: Player[];
}

interface Player {
    id: number;
    name: string;
    age: number;
    jersey_no: number;
    player_type: string;
    batting_order: string;
    fitness: number;
    morale: number;
}

interface DashboardProps {
    team?: Team;
}

export default function Dashboard({ team }: DashboardProps) {
    const getPlayerTypeStats = () => {
        if (!team?.players) return { batsmen: 0, bowlers: 0, allrounders: 0, wicketkeepers: 0 };
        
        return team.players.reduce((acc, player) => {
            if (player.player_type === 'Bat') acc.batsmen++;
            else if (player.player_type === 'Bowl') acc.bowlers++;
            else if (player.player_type === 'Allrounder') acc.allrounders++;
            else if (player.player_type === 'WK') acc.wicketkeepers++;
            return acc;
        }, { batsmen: 0, bowlers: 0, allrounders: 0, wicketkeepers: 0 });
    };

    const getAverageFitness = () => {
        if (!team?.players || team.players.length === 0) return 0;
        const total = team.players.reduce((sum, p) => sum + p.fitness, 0);
        return Math.round(total / team.players.length);
    };

    const getAverageMorale = () => {
        if (!team?.players || team.players.length === 0) return 0;
        const total = team.players.reduce((sum, p) => sum + p.morale, 0);
        return Math.round(total / team.players.length);
    };

    const stats = getPlayerTypeStats();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Team Overview Section */}
                {team && (
                    <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <PlayerBust
                                    teamName={team.name}
                                    primaryColor={team.home_color_primary}
                                    secondaryColor={team.home_color_secondary}
                                    className="flex-shrink-0"
                                />
                                <div>
                                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: team.home_color_primary }}></div>
                                        {team.name}
                                    </h2>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Home className="w-4 h-4" />
                                        <span>{team.home_ground_name}</span>
                                        <span className="ml-2 px-2 py-1 rounded bg-background/50 capitalize">{team.pitch_type} Pitch</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-center px-4 py-2 rounded-lg bg-background/50 transition-all duration-300 hover:bg-background/70 hover:scale-105">
                                    <div className="text-2xl font-bold">{team.players?.length || 0}</div>
                                    <div className="text-xs text-muted-foreground">Players</div>
                                </div>
                                <div className="text-center px-4 py-2 rounded-lg bg-background/50 transition-all duration-300 hover:bg-background/70 hover:scale-105">
                                    <div className="text-2xl font-bold">{getAverageFitness()}%</div>
                                    <div className="text-xs text-muted-foreground">Avg Fitness</div>
                                </div>
                                <div className="text-center px-4 py-2 rounded-lg bg-background/50 transition-all duration-300 hover:bg-background/70 hover:scale-105">
                                    <div className="text-2xl font-bold">{getAverageMorale()}%</div>
                                    <div className="text-xs text-muted-foreground">Avg Morale</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Link href="/team" className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 hover:bg-accent/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-blue-500/50 hover:scale-[1.02]">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold">Team Roster</h3>
                            </div>
                            {team ? (
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Squad Composition:</p>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Batsmen:</span>
                                            <span className="font-semibold">{stats.batsmen}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Bowlers:</span>
                                            <span className="font-semibold">{stats.bowlers}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>All-rounders:</span>
                                            <span className="font-semibold">{stats.allrounders}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Keepers:</span>
                                            <span className="font-semibold">{stats.wicketkeepers}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground mb-4">View all 15 players</p>
                            )}
                            <div className="flex-1 flex items-end">
                                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">View Full Roster →</span>
                            </div>
                        </div>
                    </Link>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 transition-all duration-300 hover:shadow-lg hover:border-green-500/50">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center animate-pulse">
                                    <TrendingUp className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold">Training</h3>
                            </div>
                            <ComingSoon 
                                title="Training System" 
                                description="Train your players to improve their skills and performance"
                                className="flex-1 h-full"
                            />
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 transition-all duration-300 hover:shadow-lg hover:border-red-500/50">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-red-500 rounded-full mr-3 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.2s' }}>
                                    <Trophy className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold">Matches</h3>
                            </div>
                            <ComingSoon 
                                title="Match System" 
                                description="Experience simulated matches with live commentary and detailed scorecards"
                                className="flex-1 h-full"
                            />
                        </div>
                    </div>
                </div>
                {team && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 transition-all duration-300 hover:shadow-lg hover:border-yellow-500/50">
                            <div className="flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                                        <Home className="w-4 h-4 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold">Home Stadium</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Stadium Name:</span>
                                        <span className="font-semibold">{team.home_ground_name}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Pitch Type:</span>
                                        <span className="font-semibold capitalize">{team.pitch_type}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Team Colors:</span>
                                        <div className="flex gap-2">
                                            <div 
                                                className="w-8 h-8 rounded-md border-2 border-background shadow-sm" 
                                                style={{ backgroundColor: team.home_color_primary }}
                                                title="Primary Color"
                                            ></div>
                                            <div 
                                                className="w-8 h-8 rounded-md border-2 border-background shadow-sm" 
                                                style={{ backgroundColor: team.home_color_secondary }}
                                                title="Secondary Color"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-sidebar-border/50">
                                    <Link 
                                        href="/team/edit" 
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                    >
                                        Edit Team Settings →
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 transition-all duration-300 hover:shadow-lg hover:border-purple-500/50">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-purple-500 rounded-full mr-3 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.4s' }}>
                                        <Users className="w-4 h-4 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold">Playing XI</h3>
                                </div>
                                <ComingSoon 
                                    title="Team Selection" 
                                    description="Choose your best 11 players for the next match"
                                    className="flex-1 h-full"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
