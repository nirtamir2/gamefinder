import nirtamir2, { GLOB_TS, GLOB_TSX } from "@nirtamir2/eslint-config";
import sortDestructureKeysPlugin from "eslint-plugin-sort-destructure-keys-typescript";

export default nirtamir2(
  {
    formatters: true,
    react: true,
  },
  {
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "sort-destructure-keys-typescript": sortDestructureKeysPlugin,
    },
    rules: {
      "sort-destructure-keys-typescript/sort-destructure-keys-by-type": "error",
    },
  },
);
