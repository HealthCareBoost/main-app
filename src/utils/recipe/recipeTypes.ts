import type { z } from "zod";
import type { RecipeSchema } from "../validations/createRecipeSchema";
import type { RouterOutputs } from "../api";
import type {
  Ingredients,
  Recipe as RecipeType,
  RecipeImage,
  User,
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
