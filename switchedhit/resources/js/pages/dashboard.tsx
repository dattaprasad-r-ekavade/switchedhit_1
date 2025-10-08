import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-500 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold">Team Roster</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">Manage your 15 players</p>
                            <div className="flex-1">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-green-500 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold">Training</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">Train players daily</p>
                            <div className="flex-1">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-red-500 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold">Matches</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">View scorecards & commentary</p>
                            <div className="flex-1">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-yellow-500 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold">Stadiums</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">Manage your home ground</p>
                            <div className="flex-1">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-purple-500 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold">Playing XI</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">Select your starting lineup</p>
                            <div className="flex-1">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
