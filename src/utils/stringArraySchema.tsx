import { parseAsArrayOf, parseAsString } from "nuqs/server";

export const stringArraySchema = parseAsArrayOf(parseAsString).withDefault([]);
