import type { RecipeComponentProps, RecipeForm } from "./recipe/recipeTypes";
import { minutesToFormTime } from "./timeConverter";

export function RecipeMapper(
  result: RecipeComponentProps
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
