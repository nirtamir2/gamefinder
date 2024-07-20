import { env } from "@/env";

interface Root {
  count: number;
  next: string;
  previous: unknown;
  results: Array<Result>;
  user_platforms: boolean;
}

interface Result {
  slug: string;
  name: string;
  playtime: number;
  platforms: Array<Platform>;
  stores?: Array<Store>;
  released: string;
  tba: boolean;
  background_image?: string;
  rating: number;
  rating_top: number;
  ratings: Array<Rating>;
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status?: AddedByStatus;
  metacritic: unknown;
  suggestions_count: number;
  updated: string;
  id: number;
  score: string;
  clip: unknown;
  tags: Array<Tag>;
  esrb_rating?: EsrbRating;
  user_game: unknown;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  short_screenshots: Array<ShortScreenshot>;
  parent_platforms: Array<ParentPlatform>;
  genres: Array<Genre>;
  community_rating?: number;
}

interface Platform {
  platform: Platform2;
}

interface Platform2 {
  id: number;
  name: string;
  slug: string;
}

interface Store {
  store: Store2;
}

interface Store2 {
  id: number;
  name: string;
  slug: string;
}

interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

interface AddedByStatus {
  owned?: number;
  dropped?: number;
  beaten?: number;
  yet?: number;
  toplay?: number;
  playing?: number;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

interface EsrbRating {
  id: number;
  name: string;
  slug: string;
  name_en: string;
  name_ru: string;
}

interface ShortScreenshot {
  id: number;
  image: string;
}

interface ParentPlatform {
  platform: Platform3;
}

interface Platform3 {
  id: number;
  name: string;
  slug: string;
}

interface Genre {
  id: number;
  name: string;
  slug: string;
}

export async function searchGames(searchTerm: string) {
  const response = await fetch(
    `https://api.rawg.io/api/games?search=${searchTerm}&key=${env.RAWG_API_KEY}`,
  );
  return (await response.json()) as Root;
}

// https://api.rawg.io/api/games?key=60ff4074fae4439abc3176e4ba9f0756&search=snoo

// https://api.rawg.io/api/games/gta?key=60ff4074fae4439abc3176e4ba9f0756

// {
//   "detail": "Not found."
// } | {
//   "redirect": true,
//   "slug": "grand-theft-auto-1998"
// } | {
//   "id": 145267,
//   "slug": "star",
//   "name": "star",
//   "name_original": "star",
//   "description": "<p>the only one</p>",
//   "metacritic": null,
//   "metacritic_platforms": [],
//   "released": "2017-03-23",
//   "tba": false,
//   "updated": "2019-01-09T12:41:06",
//   "background_image": "https://media.rawg.io/media/screenshots/079/0792c8401dec3b3503126ad38d8107f9.jpg",
//   "background_image_additional": null,
//   "website": "",
//   "rating": 0.0,
//   "rating_top": 0,
//   "ratings": [],
//   "reactions": null,
//   "added": 0,
//   "added_by_status": null,
//   "playtime": 0,
//   "screenshots_count": 1,
//   "movies_count": 0,
//   "creators_count": 0,
//   "achievements_count": 0,
//   "parent_achievements_count": 0,
//   "reddit_url": "",
//   "reddit_name": "",
//   "reddit_description": "",
//   "reddit_logo": "",
//   "reddit_count": 0,
//   "twitch_count": 0,
//   "youtube_count": 0,
//   "reviews_text_count": 0,
//   "ratings_count": 0,
//   "suggestions_count": 20,
//   "alternative_names": [],
//   "metacritic_url": "",
//   "parents_count": 0,
//   "additions_count": 0,
//   "game_series_count": 0,
//   "user_game": null,
//   "reviews_count": 0,
//   "community_rating": 0,
//   "saturated_color": "0f0f0f",
//   "dominant_color": "0f0f0f",
//   "parent_platforms": [
//       {
//           "platform": {
//               "id": 1,
//               "name": "PC",
//               "slug": "pc"
//           }
//       }
//   ],
//   "platforms": [
//       {
//           "platform": {
//               "id": 4,
//               "name": "PC",
//               "slug": "pc",
//               "image": null,
//               "year_end": null,
//               "year_start": null,
//               "games_count": 532583,
//               "image_background": "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg"
//           },
//           "released_at": "2017-03-23",
//           "requirements": {}
//       }
//   ],
//   "stores": [
//       {
//           "id": 137093,
//           "url": "",
//           "store": {
//               "id": 9,
//               "name": "itch.io",
//               "slug": "itch",
//               "domain": "itch.io",
//               "games_count": 654162,
//               "image_background": "https://media.rawg.io/media/screenshots/ad4/ad445a12ee46543d4d117f3893041ebf.jpg"
//           }
//       }
//   ],
//   "developers": [
//       {
//           "id": 61235,
//           "name": "trashmap",
//           "slug": "trashmap",
//           "games_count": 7,
//           "image_background": "https://media.rawg.io/media/screenshots/2ff/2ffbdc578fd935356234fee9a717561b.jpg"
//       }
//   ],
//   "genres": [],
//   "tags": [
//       {
//           "id": 746,
//           "name": "Altgame",
//           "slug": "altgame",
//           "language": "eng",
//           "games_count": 590,
//           "image_background": "https://media.rawg.io/media/screenshots/453/453f8f96ecda21797130c204d93bdd5f.jpg"
//       },
//       {
//           "id": 2845,
//           "name": "star",
//           "slug": "star",
//           "language": "eng",
//           "games_count": 104,
//           "image_background": "https://media.rawg.io/media/screenshots/88c/88c8f7f46f786ea7179f08add3692f15.jpg"
//       },
//       {
//           "id": 3908,
//           "name": "trashgame",
//           "slug": "trashgame",
//           "language": "eng",
//           "games_count": 58,
//           "image_background": "https://media.rawg.io/media/screenshots/a35/a3591d14e0834444bf08b5a3793a96c4.jpg"
//       }
//   ],
//   "publishers": [],
//   "esrb_rating": null,
//   "clip": null,
//   "description_raw": "the only one"
// }

// https://api-docs.igdb.com/#game-video
