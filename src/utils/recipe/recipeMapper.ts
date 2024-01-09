import type { RecipeToUpdateType, RecipeForm } from "./recipeTypes";
import { minutesToFormTime } from "../timeConverter";
import type { RecipeImage } from "@prisma/client";
import type { RecipeSchema } from "../validations/createRecipeSchema";
import type { z } from "zod";

/**
 * Maps a recipe result from the db to match
 * the RecipeFormProps for rendering in the frontend.
 *
 * @function
 * @name RecipeMapper
 *
 * @param {RecipeToUpdateType} result - The result of a db call containing the recipe to be mapped
 *
 * @returns {RecipeForm | undefined} The mapped RecipeForm object, or undefined if the input is invalid
 */
export function RecipeMapper(
  result: RecipeToUpdateType
): RecipeForm | undefined {
  if (!result || !result.recipe) return;
  const { recipe } = result;
  const {
    cooking_time_minutes,
    description,
    difficulty_level,
    // images,
    ingredients,
    name,
    preparation_time_minutes,
    recipe_steps,
  } = recipe;

  const { cookingHours, cookingMinutes, preparationHours, preparationMinutes } =
    minutesToFormTime(preparation_time_minutes, cooking_time_minutes);

  const recipeIngredients = ingredients.map((ingredient) => {
    return {
      ingredient_name: ingredient.name,
      measurement_unit: ingredient.measurement_unit,
      quantity: ingredient.quantity,
    };
  });

  return {
    images: [],
    ingredients: recipeIngredients,
    description,
    difficultyLevel: difficulty_level,
    name,
    recipe_steps,
    cookingHours,
    cookingMinutes,
    preparationHours,
    preparationMinutes,
  };
}

export type ImageDataToSave = Omit<
  RecipeImage,
  "id" | "is_deleted" | "updatedAt" | "recipe_id"
>;

export function RecipeImageMapper(
  recipeImages: z.infer<typeof RecipeSchema>["images"]
): ImageDataToSave[] {
  if (!recipeImages || recipeImages.length === 0) return [];

  const imageDataToSave: ImageDataToSave[] = recipeImages.map((imageInfo) => {
    return {
      path: imageInfo.path,
      filename:
        imageInfo.public_id && imageInfo.folder
          ? (imageInfo.public_id.split(`${imageInfo.folder}/`).pop() as string)
          : imageInfo.public_id,
      original_filename: imageInfo.original_filename,
      original_extension: imageInfo.original_extension,
      format: imageInfo.format,
      size_in_bytes: imageInfo.bytes,
      createdAt: new Date(imageInfo.created_at),
      width: imageInfo.width,
      height: imageInfo.height,
      url: imageInfo.secure_url,
    };
  });

  return imageDataToSave;
}
