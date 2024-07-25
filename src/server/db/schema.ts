import {
  json,
  numeric,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const searchedGames = pgTable(
  "searched_games",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 256 }),
    searchCount: numeric("search_count"),
  },
  (game) => {
    return {
      nameIndex: uniqueIndex("searched_games_slug_idx").on(game.slug),
    };
  },
);

export const gameApiDetails = pgTable(
  "game_api_details",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 256 }),
    data: json("data"),
  },
  (game) => {
    return {
      nameIndex: uniqueIndex("game_api_details_slug_idx").on(game.slug),
    };
  },
);

export const gameCustomDataDetails = pgTable(
  "custom_game_data",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 256 }),
    data: json("data"),
  },
  (game) => {
    return {
      nameIndex: uniqueIndex("custom_game_data_slug_idx").on(game.slug),
    };
  },
);
