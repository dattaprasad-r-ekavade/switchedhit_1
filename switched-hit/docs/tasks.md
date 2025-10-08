# Development Tasks

## Phase 1: Core Setup

1.  **Project Initialization:**
    -   [x] Set up Next.js 13 project with Pages Router.
    -   [x] Integrate Tailwind CSS.
    -   [x] Install and configure Shadcn UI.
2.  **Database Setup:**
    -   [x] Create a Turso database.
    -   [x] Set up environment variables (`.env.local`) for the database connection URL and auth token.
    -   [x] Define the initial database schema for managers, teams, players, and grounds.
3.  **Initial UI Layout:**
    -   [x] Create a basic layout component with a sidebar for navigation and a main content area.

## Phase 2: Manager and Team Creation

4.  **Manager Creation:**
    -   [ ] Create the UI for manager creation (name, nationality).
    -   [ ] Implement the API route to save the new manager to the database.
5.  **Team Creation:**
    -   [ ] Create the UI for team creation (team name, home ground selection).
    -   [ ] Implement the API route to save the new team and associate it with the manager.
    -   [ ] Auto-generate and save a squad of 15 players for the new team.

## Phase 3: Player and Team Management

6.  **Dashboard/Home Page:**
    -   [ ] Display the manager's team and player roster.
7.  **Player Profiles:**
    -   [ ] Create a page to view detailed player profiles with their attributes and stats.
8.  **Training Section:**
    -   [ ] Develop the UI for the training section.
    -   [ ] Implement the logic to update player attributes based on training assignments.

## Phase 4: League and Simulation

9.  **League Structure:**
    -   [ ] Create the database schema for leagues, divisions, and fixtures.
    -   [ ] Implement logic to place new teams into the lowest division.
10. **Game Simulation:**
    -   [ ] Design and implement the core simulation engine.
    -   [ ] Create a scheduled job (e.g., using a cron job service) to run simulations.
11. **Match Results:**
    -   [ ] Display fixture lists and match results.
    -   [ ] Update league tables based on results.

## Phase 5: Polishing

12. **Styling and UX:**
    -   [ ] Refine the UI and ensure a consistent and clean user experience.
13. **Deployment:**
    -   [ ] Deploy the application to a hosting service (e.g., Vercel).