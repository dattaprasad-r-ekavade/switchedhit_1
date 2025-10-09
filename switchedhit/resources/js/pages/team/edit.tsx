import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Team Settings',
        href: '/team/edit',
    },
];

interface Team {
    id: number;
    name: string;
    home_ground_name: string;
    pitch_type: string;
    home_color_primary: string;
    home_color_secondary: string;
}

interface TeamEditProps {
    team: Team;
}

export default function TeamEdit({ team }: TeamEditProps) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        name: team.name || '',
        home_ground_name: team.home_ground_name || '',
        pitch_type: team.pitch_type || 'flat',
        home_color_primary: team.home_color_primary || '#1E40AF',
        home_color_secondary: team.home_color_secondary || '#3B82F6',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/team/edit');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Team Details" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/dashboard" className="p-2 hover:bg-accent rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Team Settings</h1>
                        <p className="text-sm text-muted-foreground">Update your team details</p>
                    </div>
                </div>

                {/* Success Message */}
                {recentlySuccessful && (
                    <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4">
                        <p className="text-sm text-green-800 dark:text-green-200">
                            ✓ Team details updated successfully!
                        </p>
                    </div>
                )}

                {/* Form Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Team Information</CardTitle>
                        <CardDescription>
                            Manage your team's identity, home ground, and colors
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Team Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-base font-semibold">
                                    Team Name *
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="e.g., Mumbai Warriors, Chennai Kings"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="text-base"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                )}
                            </div>

                            {/* Home Stadium */}
                            <div className="space-y-2">
                                <Label htmlFor="home_ground_name" className="text-base font-semibold">
                                    Home Stadium Name *
                                </Label>
                                <Input
                                    id="home_ground_name"
                                    type="text"
                                    placeholder="e.g., Wankhede Stadium, Eden Gardens"
                                    value={data.home_ground_name}
                                    onChange={(e) => setData('home_ground_name', e.target.value)}
                                    className="text-base"
                                    required
                                />
                                {errors.home_ground_name && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.home_ground_name}</p>
                                )}
                            </div>

                            {/* Pitch Type */}
                            <div className="space-y-2">
                                <Label htmlFor="pitch_type" className="text-base font-semibold">
                                    Pitch Type *
                                </Label>
                                <Select
                                    value={data.pitch_type}
                                    onValueChange={(value) => setData('pitch_type', value)}
                                >
                                    <SelectTrigger className="text-base">
                                        <SelectValue placeholder="Select pitch type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="green">Green - Favours fast bowlers</SelectItem>
                                        <SelectItem value="flat">Flat - Balanced for batting and bowling</SelectItem>
                                        <SelectItem value="dry">Dry - Favours spin bowlers</SelectItem>
                                        <SelectItem value="damp">Damp - Good for swing bowling</SelectItem>
                                        <SelectItem value="sporting">Sporting - Assistance for all</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.pitch_type && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.pitch_type}</p>
                                )}
                            </div>

                            {/* Team Colors */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="home_color_primary" className="text-base font-semibold">
                                        Primary Color *
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="home_color_primary"
                                            type="color"
                                            value={data.home_color_primary}
                                            onChange={(e) => setData('home_color_primary', e.target.value)}
                                            className="w-20 h-11 p-1 cursor-pointer"
                                            required
                                        />
                                        <Input
                                            type="text"
                                            value={data.home_color_primary}
                                            onChange={(e) => setData('home_color_primary', e.target.value)}
                                            className="flex-1"
                                            placeholder="#1E40AF"
                                            pattern="^#[0-9A-Fa-f]{6}$"
                                        />
                                    </div>
                                    {errors.home_color_primary && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.home_color_primary}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="home_color_secondary" className="text-base font-semibold">
                                        Secondary Color *
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="home_color_secondary"
                                            type="color"
                                            value={data.home_color_secondary}
                                            onChange={(e) => setData('home_color_secondary', e.target.value)}
                                            className="w-20 h-11 p-1 cursor-pointer"
                                            required
                                        />
                                        <Input
                                            type="text"
                                            value={data.home_color_secondary}
                                            onChange={(e) => setData('home_color_secondary', e.target.value)}
                                            className="flex-1"
                                            placeholder="#3B82F6"
                                            pattern="^#[0-9A-Fa-f]{6}$"
                                        />
                                    </div>
                                    {errors.home_color_secondary && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.home_color_secondary}</p>
                                    )}
                                </div>
                            </div>

                            {/* Color Preview */}
                            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                <Label className="text-sm font-medium mb-2 block">Color Preview</Label>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-2">
                                        <div
                                            className="w-16 h-16 rounded-lg shadow-md border-2 border-white dark:border-gray-800"
                                            style={{ backgroundColor: data.home_color_primary }}
                                        ></div>
                                        <div
                                            className="w-16 h-16 rounded-lg shadow-md border-2 border-white dark:border-gray-800"
                                            style={{ backgroundColor: data.home_color_secondary }}
                                        ></div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground">
                                            These colors will represent your team throughout the game.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
