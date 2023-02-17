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

export const createRecipeSchema = z.object({
  name: z.string().min(3).max(50),
  preparationTime: z.number().min(1).max(60),
  preparationTimeUnit: z.nativeEnum(TimeUnits),
  difficultyLevel: z.nativeEnum(DifficultyLevel),
  description: z.string().min(20).optional(),
  images: z.instanceof(FileList).or(z.instanceof(File)), // not sure if its right
  category: z.nativeEnum(MeasurementUnits).optional(),
  recipe_steps: z.string(),
  video_url: z.string().optional(),
  ingredients: z
    .object({
      ingredient_name: z.string().min(3).max(50),
      quantity: z.number().min(1),
      measurement_unit: z.nativeEnum(MeasurementUnits),
    })
    .array()
    .min(1),
});
