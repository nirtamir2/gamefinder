CREATE TABLE IF NOT EXISTS "game_api_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(256),
	"data" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "custom_game_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(256),
	"data" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "searched_games" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(256),
	"search_count" numeric
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "game_api_details_slug_idx" ON "game_api_details" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "custom_game_data_slug_idx" ON "custom_game_data" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "searched_games_slug_idx" ON "searched_games" USING btree ("slug");