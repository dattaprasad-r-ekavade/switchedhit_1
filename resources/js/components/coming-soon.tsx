import { cn } from '@/lib/utils';
import { Clock, Sparkles } from 'lucide-react';

interface ComingSoonProps {
    className?: string;
    title?: string;
    description?: string;
}

export function ComingSoon({ 
    className,
    title = "Coming Soon",
    description = "This feature is currently under development"
}: ComingSoonProps) {
    return (
        <div className={cn(
            "relative flex flex-col items-center justify-center p-8 rounded-lg",
            "bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800",
            "border border-neutral-200 dark:border-neutral-700",
            "overflow-hidden group",
            className
        )}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="relative">
                    <Clock className="w-12 h-12 text-neutral-400 dark:text-neutral-500 animate-pulse" />
                    <Sparkles className="w-5 h-5 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                        {title}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">
                        {description}
                    </p>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-2xl" />
        </div>
    );
}
