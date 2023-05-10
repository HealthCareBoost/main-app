import type { z } from "zod";
import type { RecipeSchema } from "../validations/createRecipeSchema";
import type { RouterOutputs } from "../api";
import type {
  Ingredients,
  Recipe as RecipeType,
  RecipeImage,
  User,
  MeasurementUnits,
} from "@prisma/client";

export type RecipeForm = z.infer<typeof RecipeSchema>;
export type RecipeOutput = Pick<
  RouterOutputs["recipe"]["getRecipeByID"],
  "recipe"
>;

export type TryResipe = RecipeType & {
  user: User;
  ingredients: Ingredients[];
  images: RecipeImage[];
  categories: {
    category: {
      id: number;
      name: string;
    };
  }[];
};

export type RecipeComponentProps = {
  recipe: RecipeType & {
    user: User;
    ingredients: Ingredients[];
    images: RecipeImage[];
    categories: {
      category: {
        id: number;
        name: string;
      };
    }[];
  };
};

// export type NewIngredient = Pick<
//   Ingredients,
//   "measurement_unit" | "quantity" | "name"
// >;

export type NewIngredient = {
  name: string;
  quantity: number;
  measurement_unit: MeasurementUnits;
};

export type IngredientToUpdate = {
  id: number;
  name: string;
  quantity: number;
  measurement_unit: MeasurementUnits;
};
