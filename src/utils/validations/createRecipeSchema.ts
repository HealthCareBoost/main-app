import { z } from "zod";
import { MeasurementUnits } from "@prisma/client";
import { DifficultyLevel, Categories } from "../enumsMap";
import { ImageInfoSchema } from "./imageSchema";

export const RecipeSchema = z.object({
  name: z.string().min(3).max(50),
  preparationMinutes: z.coerce
    .number({
      required_error: "Please select a number",
      invalid_type_error: "That's not a valid number!",
    })
    .min(0),
  preparationHours: z.coerce
    .number({
      required_error: "Please select a number",
      invalid_type_error: "That's not a valid number!",
    })
    .min(0),
  cookingMinutes: z.coerce
    .number({
      required_error: "Please select a number",
      invalid_type_error: "That's not a valid number!",
    })
    .min(0),
  cookingHours: z.coerce
    .number({
      required_error: "Please select a number",
      invalid_type_error: "That's not a valid number!",
    })
    .min(0),
  // preparationTimeUnit: z.nativeEnum(TimeUnits),
  difficultyLevel: z.nativeEnum(DifficultyLevel),
  description: z.string().min(20),
  images: ImageInfoSchema.optional(), // doesn't work if its not optional
  category: z.nativeEnum(Categories).optional(),
  recipe_steps: z.string(),
  video_url: z.string().optional(),
  ingredients: z
    .object({
      ingredient_name: z.string().min(3).max(50),
      quantity: z.coerce.number().min(0.1),
      measurement_unit: z.nativeEnum(MeasurementUnits),
    })
    .array(),
});
