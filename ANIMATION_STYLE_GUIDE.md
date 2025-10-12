# Quick Reference: UI Animation & Styling Guide

## Common Animation Classes

### Fade Effects
```tsx
className="animate-in fade-in duration-500"
```

### Slide Effects
```tsx
className="slide-in-from-top-4 duration-500"
```

### Combined Entry Animation
```tsx
className="animate-in fade-in slide-in-from-top-4 duration-500"
```

### Hover Effects
```tsx
// Scale up
className="transition-all duration-300 hover:scale-105"

// Scale with shadow
className="transition-all duration-300 hover:scale-105 hover:shadow-lg"

// Border glow effect
className="transition-all duration-300 hover:shadow-lg hover:border-blue-500/50"
```

## Coming Soon Component Usage

### Import
```tsx
import { ComingSoon } from '@/components/coming-soon';
```

### Basic Usage
```tsx
<ComingSoon />
```

### Custom Content
```tsx
<ComingSoon 
    title="Your Feature Name"
    description="A brief description of what this feature will provide"
    className="additional-classes"
/>
```

### Full Height Container
```tsx
<ComingSoon 
    title="Training System"
    description="Train your players daily"
    className="flex-1 h-full"
/>
```

## Card Styling Pattern

### Standard Card with Hover
```tsx
<div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-500/50">
    {/* Content */}
</div>
```

### Clickable Card (Link)
```tsx
<Link 
    href="/path" 
    className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 hover:bg-accent/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-blue-500/50 hover:scale-[1.02]"
>
    {/* Content */}
</Link>
```

## Icon Animations

### Pulsing Icon
```tsx
<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
    <Icon className="w-4 h-4 text-white" />
</div>
```

### Staggered Pulsing Icons
```tsx
// First icon
<div className="... animate-pulse">

// Second icon (delayed)
<div className="... animate-pulse" style={{ animationDelay: '0.2s' }}>

// Third icon (more delayed)
<div className="... animate-pulse" style={{ animationDelay: '0.4s' }}>
```

## Color Scheme Reference

### Feature Colors
```tsx
// Team/Players - Blue
className="bg-blue-500 hover:border-blue-500/50"

// Training/Growth - Green
className="bg-green-500 hover:border-green-500/50"

// Matches/Competition - Red
className="bg-red-500 hover:border-red-500/50"

// Stadium/Home - Yellow
className="bg-yellow-500 hover:border-yellow-500/50"

// Strategy/Selection - Purple
className="bg-purple-500 hover:border-purple-500/50"
```

## Button Patterns

### Primary Action Button
```tsx
<button className="inline-block rounded-sm bg-[#f53003] px-6 py-2 text-sm font-medium text-white hover:bg-[#d12802] dark:bg-[#FF4433] dark:hover:bg-[#e63946] transition-all duration-300 hover:scale-105 hover:shadow-lg">
    Start Your Journey
</button>
```

### Secondary Button
```tsx
<button className="inline-block rounded-sm border border-[#19140035] px-6 py-2 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] transition-all duration-300 hover:scale-105">
    Login
</button>
```

## Stat Card Pattern

```tsx
<div className="text-center px-4 py-2 rounded-lg bg-background/50 transition-all duration-300 hover:bg-background/70 hover:scale-105">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
</div>
```

## Section Headers

### With Icon
```tsx
<div className="flex items-center mb-4">
    <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
        <Icon className="w-4 h-4 text-white" />
    </div>
    <h3 className="text-lg font-semibold">Section Title</h3>
</div>
```

## Gradient Backgrounds

### Light Gradient
```tsx
className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
```

### Card Gradient
```tsx
className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"
```

### Hero Gradient
```tsx
className="bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700"
```

## Responsive Classes

### Grid Layouts
```tsx
// 1 column mobile, 3 columns desktop
className="grid gap-4 md:grid-cols-3"

// 1 column mobile, 2 columns desktop
className="grid gap-4 md:grid-cols-2"

// Auto-fit responsive
className="grid auto-rows-min gap-4 md:grid-cols-3"
```

### Flex Layouts
```tsx
// Column on mobile, row on desktop
className="flex flex-col md:flex-row gap-4"
```

## Dark Mode Patterns

### Text Colors
```tsx
className="text-[#1b1b18] dark:text-[#EDEDEC]"
className="text-muted-foreground"
```

### Borders
```tsx
className="border border-sidebar-border/70 dark:border-sidebar-border"
```

### Backgrounds
```tsx
className="bg-white dark:bg-[#161615]"
className="bg-background"
```

## Animation Timing Guidelines

- **Page Load**: 500ms (balanced)
- **Hover Effects**: 300ms (responsive)
- **Button Clicks**: 200ms (immediate feedback)
- **Subtle Animations**: 700ms+ (background effects)
- **Icon Pulses**: Use default (continuous)

## Stagger Timing Pattern

```tsx
// No delay
<div className="animate-pulse">

// Short delay
<div className="animate-pulse" style={{ animationDelay: '0.2s' }}>

// Medium delay
<div className="animate-pulse" style={{ animationDelay: '0.4s' }}>

// Long delay
<div className="animate-pulse" style={{ animationDelay: '0.6s' }}>
```

## Common Transitions

### All Properties
```tsx
className="transition-all duration-300"
```

### Specific Properties
```tsx
className="transition-colors duration-300"
className="transition-transform duration-300"
className="transition-opacity duration-300"
```

## Z-Index Layers

```tsx
z-0   // Base layer
z-10  // Content layer
z-20  // Overlay layer
z-30  // Modal layer
z-40  // Tooltip layer
z-50  // Notification layer
```

## Spacing Scale

```tsx
gap-2   // 0.5rem (8px)
gap-4   // 1rem (16px)
gap-6   // 1.5rem (24px)
gap-8   // 2rem (32px)

p-4     // padding: 1rem
p-6     // padding: 1.5rem
p-8     // padding: 2rem
```

## Border Radius

```tsx
rounded-md    // 0.375rem
rounded-lg    // 0.5rem
rounded-xl    // 0.75rem
rounded-full  // 9999px (circle)
```

## Pro Tips

1. **Always use transition classes** when adding hover effects
2. **Test dark mode** for every new component
3. **Keep animations subtle** - under 500ms for most interactions
4. **Use semantic colors** - blue for info, green for success, red for action
5. **Stagger animations** when multiple elements appear together
6. **Test on mobile** - hover states should work on touch devices
7. **Use opacity for subtle effects** - /50, /70, /80 variations
8. **Combine animations** - scale + shadow + border for rich feedback

## Debugging Animations

If an animation isn't working:
1. Check if parent has `overflow-hidden` (can clip transforms)
2. Verify transition classes are applied
3. Test without dark mode first
4. Check browser dev tools for conflicting styles
5. Ensure animation classes are defined in CSS
6. Test with reduced motion disabled

## Resources

- Tailwind CSS Docs: https://tailwindcss.com/docs
- Lucide Icons: https://lucide.dev/icons
- Color Reference: See `UI_ENHANCEMENT_CHANGELOG.md`
