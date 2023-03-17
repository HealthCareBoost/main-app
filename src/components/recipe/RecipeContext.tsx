import { createContext } from "react";
import { type RecipeFiltersType } from "./RecipeReducer";

export type RecipeContextType = {
  recipeState: RecipeFiltersType;
  recipeDispatch: React.Dispatch<{
    type: string;
    payload: Partial<RecipeFiltersType>;
  }>;
};

export const RecipeContext = createContext<RecipeContextType>(
  {} as RecipeContextType
);
