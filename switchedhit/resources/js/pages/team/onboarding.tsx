import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Team {
    id: number;
    name?: string;
    home_ground_name?: string;
    pitch_type?: string;
    home_color_primary?: string;
    home_color_secondary?: string;
}

interface OnboardingProps {
    team: Team;
}

export default function TeamOnboarding({ team }: OnboardingProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: team.name || '',
        home_ground_name: team.home_ground_name || '',
        pitch_type: team.pitch_type || 'flat',
        home_color_primary: team.home_color_primary || '#1E40AF',
        home_color_secondary: team.home_color_secondary || '#3B82F6',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/team/onboarding');
    };

    return (
        <>
            <Head title="Team Setup" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <CardTitle className="text-3xl font-bold">Welcome to SwitchedHit!</CardTitle>
                        <CardDescription className="text-base mt-2">
                            Let's set up your cricket team. This information will help personalize your experience.
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
                            <Button
                                type="submit"
                                className="w-full text-base h-12"
                                disabled={processing}
                            >
                                {processing ? 'Setting up your team...' : 'Complete Team Setup'}
                            </Button>

                            <p className="text-xs text-center text-muted-foreground">
                                You can change these details later from your team settings.
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
