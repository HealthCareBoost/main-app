export type StatsKey = "recipes" | "comments" | "liked" | "saved" | "made";

export const Map = {
  recipes: "Owned Recipes",
  comments: "Comments Made",
  liked: "Recipes Liked",
  saved: "Saved Recipes",
  made: "Made Recipes",
} as const;

export const statsToTitleMap = (stats: StatsKey): string => {
  return Map[stats];
};
