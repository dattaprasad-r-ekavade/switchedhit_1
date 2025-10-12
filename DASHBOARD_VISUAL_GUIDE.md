# Dashboard Visual Structure

## Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Header: SwitchedHit Logo | Dashboard | User Menu               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Team Overview Section (Animated Fade-in + Slide from top)     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [Jersey Icon]  Team Name                                 │  │
│  │  🏠 Stadium Name • Pitch Type                            │  │
│  │                                                           │  │
│  │  [15 Players] [85% Fitness] [90% Morale] (Hover: Scale) │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Team Roster     │ │  Training        │ │  Matches         │
│  [🔵 Users Icon] │ │  [🟢 📈 Pulse]   │ │  [🔴 🏆 Pulse]   │
│                  │ │                  │ │                  │
│  Squad Stats:    │ │  ⏰ Coming Soon  │ │  ⏰ Coming Soon  │
│  • Batsmen: 5    │ │  ✨ Animation   │ │  ✨ Animation   │
│  • Bowlers: 5    │ │  "Train players │ │  "Match system  │
│  • Allround: 3   │ │   to improve    │ │   with live     │
│  • Keepers: 2    │ │   skills..."    │ │   commentary"   │
│                  │ │                  │ │                  │
│  View Roster →   │ │                  │ │                  │
│  (Hover: Blue    │ │  (Hover: Green   │ │  (Hover: Red     │
│   Border Glow +  │ │   Border Glow +  │ │   Border Glow +  │
│   Shadow + Scale)│ │   Shadow)        │ │   Shadow)        │
└──────────────────┘ └──────────────────┘ └──────────────────┘

┌───────────────────────────────┐ ┌──────────────────────────────┐
│  Home Stadium                 │ │  Playing XI                  │
│  [🟡 🏠 Icon]                 │ │  [🟣 👥 Pulse]               │
│                               │ │                              │
│  Stadium: Wankhede            │ │  ⏰ Coming Soon              │
│  Pitch: Balanced              │ │  ✨ Animation               │
│  Colors: [🔵][🔷]            │ │  "Choose your best          │
│                               │ │   11 players..."            │
│  Edit Team Settings →         │ │                              │
│  (Hover: Yellow Border Glow)  │ │  (Hover: Purple Border Glow) │
└───────────────────────────────┘ └──────────────────────────────┘
```

## Animation Details

### On Page Load
- Team overview section: Fades in + slides from top (500ms)

### Hover States
All cards respond to hover with:
- Smooth 300ms transitions
- Shadow elevation
- Colored border glow matching card theme
- Team Roster: Additional scale effect (1.02x)

### Continuous Animations
- Training icon: Pulsing (0ms delay)
- Matches icon: Pulsing (200ms delay)
- Playing XI icon: Pulsing (400ms delay)
- Coming Soon clock: Pulsing
- Coming Soon sparkles: Bouncing
- Coming Soon background: Gradient pulse on hover (700ms)

### Interactive Elements
- Stat cards (Players/Fitness/Morale): Scale to 1.05x on hover
- All cards: Cursor changes to pointer where clickable
- Links: Color transition effects

## Color Palette
- **Team Roster**: Blue (#3B82F6) - Professional, informative
- **Training**: Green (#10B981) - Growth, improvement
- **Matches**: Red (#EF4444) - Excitement, competition
- **Stadium**: Yellow (#F59E0B) - Home, warmth
- **Playing XI**: Purple (#A855F7) - Strategy, selection

## Coming Soon Component Features
- Centered layout with icon + text
- Gradient background (light/dark mode aware)
- Border styling matching theme
- Hover reveals animated gradient overlay
- Clock icon with sparkles for visual interest
- Clear messaging about feature status

## Responsive Design
- Grid layout adapts to screen size:
  - Mobile: Single column
  - Tablet: 2-3 columns
  - Desktop: 3 columns for cards, 2 for stadium/XI
- Text and spacing scale appropriately
- Touch-friendly hover states on mobile

## Dark Mode Support
All animations and colors have dark mode variants:
- Background gradients adjust for dark theme
- Text colors maintain readability
- Border and shadow effects remain visible
- Coming Soon component adapts completely

## Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigation support
- Focus states visible
- Reduced motion support (via Tailwind)
