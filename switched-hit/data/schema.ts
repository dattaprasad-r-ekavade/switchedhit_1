// data/schema.ts

import { integer, sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';

// Managers Table
export const managers = sqliteTable('managers', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  nationality: text('nationality').notNull(),
});

// Teams Table
export const teams = sqliteTable('teams', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  managerId: integer('manager_id').references(() => managers.id),
  homeGroundId: integer('home_ground_id').references(() => grounds.id),
});

// Players Table
export const players = sqliteTable('players', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  teamId: integer('team_id').references(() => teams.id),
  battingSkill: integer('batting_skill').notNull(),
  bowlingSkill: integer('bowling_skill').notNull(),
  fieldingSkill: integer('fielding_skill').notNull(),
});

// Grounds Table
export const grounds = sqliteTable('grounds', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(),
});

// Leagues Table
export const leagues = sqliteTable('leagues', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
});

// Divisions Table
export const divisions = sqliteTable('divisions', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  leagueId: integer('league_id').references(() => leagues.id),
});

// Fixtures Table
export const fixtures = sqliteTable('fixtures', {
  id: integer('id').primaryKey(),
  divisionId: integer('division_id').references(() => divisions.id),
  homeTeamId: integer('home_team_id').references(() => teams.id),
  awayTeamId: integer('away_team_id').references(() => teams.id),
  matchDate: integer('match_date', { mode: 'timestamp' }).notNull(),
  result: text('result'), // e.g., "Home team won by 20 runs"
});

// TeamDivisions Table (to handle team placements in divisions)
export const teamDivisions = sqliteTable('team_divisions', {
  teamId: integer('team_id').references(() => teams.id),
  divisionId: integer('division_id').references(() => divisions.id),
}, (table) => {
  return {
    pk: primaryKey(table.teamId, table.divisionId),
  };
});