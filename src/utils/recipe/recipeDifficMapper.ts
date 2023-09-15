import type { DifficultyLevel } from "@prisma/client";
import { DIFFICULTY_COLORS } from "../enumsMap";

export const getColovByDifficulty: (difficulty: DifficultyLevel) => string = (
  difficulty
) => {
  return DIFFICULTY_COLORS[difficulty]
    ? DIFFICULTY_COLORS[difficulty]
    : DIFFICULTY_COLORS.medium;
};
