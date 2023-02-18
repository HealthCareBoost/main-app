import { z } from "zod";
import { MeasurementUnits } from "@prisma/client";

export enum TimeUnits {
  seconds = "seconds",
  minutes = "minutes",
  hours = "hours",
}

export enum DifficultyLevel {
  easy = "easy",
  medium = "medium",
  hard = "hard",
  expert = "expert",
}

export const RecipeSchema = z.object({
  name: z.string().min(3).max(50),
  preparationTime: z.coerce.number().min(1).max(60),
  preparationTimeUnit: z.nativeEnum(TimeUnits),
  difficultyLevel: z.nativeEnum(DifficultyLevel),
  // z.union(z.literal("apples"), z.literal("oranges"))
  description: z.string().min(20),
  images: z.object({}).optional(), // not sure if its right
  category: z.nativeEnum(MeasurementUnits).optional(),
  recipe_steps: z.string(),
  video_url: z.string().optional(),
  ingredients: z
    .object({
      ingredient_name: z.string().min(3).max(50),
      quantity: z.coerce.number().min(1),
      measurement_unit: z.nativeEnum(MeasurementUnits),
    })
    .array(),
});
