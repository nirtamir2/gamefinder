import { env } from "@/env";

interface Root {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: Array<MetacriticPlatform>;
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: Array<Rating>;
  reactions: Reactions;
  added: number;
  added_by_status: AddedByStatus;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: Array<string>;
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game: null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: Array<ParentPlatform>;
  platforms: Array<Platform3>;
  stores: Array<Store>;
  developers: Array<Developer>;
  genres: Array<Genre>;
  tags: Array<Tag>;
  publishers: Array<Publisher>;
  esrb_rating: EsrbRating;
  clip: null;
  description_raw: string;
}

interface MetacriticPlatform {
  metascore: number;
  url: string;
  platform: Platform;
}

interface Platform {
  platform: number;
  name: string;
  slug: string;
}

interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

interface Reactions {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
  "8": number;
  "9": number;
  "10": number;
  "11": number;
  "12": number;
  "13": number;
  "14": number;
  "15": number;
  "16": number;
  "18": number;
  "20": number;
  "21": number;
}

interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

interface ParentPlatform {
  platform: Platform2;
}

interface Platform2 {
  id: number;
  name: string;
  slug: string;
}

interface Platform3 {
  platform: Platform4;
  released_at: string;
  requirements: Requirements;
}

interface Platform4 {
  id: number;
  name: string;
  slug: string;
  image: null;
  year_end: null;
  year_start?: number;
  games_count: number;
  image_background: string;
}

interface Requirements {
  minimum?: string;
  recommended?: string;
}

interface Store {
  id: number;
  url: string;
  store: Store2;
}

interface Store2 {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
}

interface Developer {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

interface Publisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export async function populatedGame(slug: string) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${slug}?key=${env.RAWG_API_KEY}`,
  );
  return (await response.json()) as Root;
}
