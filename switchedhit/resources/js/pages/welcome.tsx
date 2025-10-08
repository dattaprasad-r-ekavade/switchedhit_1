import { dashboard, login, register } from "@/routes";
import { type SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to SwitchedHit">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-4 text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">
                                Welcome to SwitchedHit
                            </h1>
                            <p className="mb-6 text-lg text-[#706f6c] dark:text-[#A1A09A]">
                                The ultimate cricket simulation management game. Become a team manager in a thrilling T20 league and lead your squad to victory!
                            </p>
                            <div className="mb-8">
                                <h2 className="mb-3 text-xl font-semibold">Game Features:</h2>
                                <ul className="space-y-2 text-[#706f6c] dark:text-[#A1A09A]">
                                    <li className="flex items-start">
                                        <span className="mr-2 text-green-600"></span>
                                        <span>Register as a team manager and receive 15 players to start your journey</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-green-600"></span>
                                        <span>Train your players daily to improve their skills and performance</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-green-600"></span>
                                        <span>Compete in daily simulated matches with detailed scorecards and live commentary</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-green-600"></span>
                                        <span>Manage your stadium to gain home advantage</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-green-600"></span>
                                        <span>Control your playing XI and make strategic decisions</span>
                                    </li>
                                </ul>
                            </div>
                            {!auth.user && (
                                <div className="flex gap-4">
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm bg-[#f53003] px-6 py-2 text-sm font-medium leading-normal text-white hover:bg-[#d12802] dark:bg-[#FF4433] dark:hover:bg-[#e63946]"
                                    >
                                        Start Your Journey
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="inline-block rounded-sm border border-[#19140035] px-6 py-2 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                            {auth.user && (
                                <Link
                                    href={dashboard()}
                                    className="inline-block rounded-sm bg-[#f53003] px-6 py-2 text-sm font-medium leading-normal text-white hover:bg-[#d12802] dark:bg-[#FF4433] dark:hover:bg-[#e63946]"
                                >
                                    Go to Dashboard
                                </Link>
                            )}
                        </div>
                        <div className="mb-6 flex items-center justify-center lg:mb-0 lg:ml-6 lg:flex-1">
                            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-tl-lg rounded-tr-lg bg-gradient-to-br from-green-400 to-blue-500 p-8 shadow-lg lg:rounded-bl-none lg:rounded-tr-lg dark:from-green-600 dark:to-blue-700">
                                <div className="flex h-full flex-col items-center justify-center text-white">
                                    <div className="mb-4 text-6xl"></div>
                                    <h3 className="text-xl font-bold">SwitchedHit</h3>
                                    <p className="text-center text-sm opacity-90">Cricket Management Sim</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
