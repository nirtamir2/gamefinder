import { createSerializer } from "nuqs/server";
import { stringArraySchema } from "@/utils/stringArraySchema";

export const searchParamsSchemaSerializer = createSerializer({
  likedGames: stringArraySchema,
  genres: stringArraySchema,
  platforms: stringArraySchema,
});
