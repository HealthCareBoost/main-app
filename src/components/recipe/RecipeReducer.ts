import type { DifficultyLevel, Recipe, RecipeImage } from "@prisma/client";

export type RecipesQueryResult =
  | (Recipe & {
      user: {
        id: string;
        name: string | null;
      };
      images: RecipeImage[];
      categories: {
        category: {
          id: number;
          name: string;
        };
      }[];
    })[]
  | undefined;

export type RecipeFiltersType = {
  selectedCategoryId: number | undefined;
  selectedDificulty: DifficultyLevel | undefined;
  selectedTimeToCook:
    | {
        higher: number;
        lower: number;
      }
    | undefined;
  orderBy: "time" | "likes" | "difficulty" | "newest" | "name" | undefined;
  recipes: RecipesQueryResult;
};

export const RecipeReducerActions = {
  RECIPES_FETCHED: "RECIPES_FETCHED",
  CHANGE_CATEGORY: "CHANGE_CATEGORY",
  CHANGE_DIFFICULTY: "CHANGE_DIFFICULTY",
  CHANGE_TIME_TO_COOK: "CHANGE_TIME_TO_COOK",
  CHANGE_ORDER_BY: "CHANGE_ORDER_BY",
} as const;

export const initialState = {
  selectedCategoryId: undefined,
  selectedDificulty: undefined,
  selectedTimeToCook: undefined,
  orderBy: undefined,
  recipes: [] as RecipesQueryResult,
};

export const RecipeReducer: (
  state: RecipeFiltersType,
  action: { type: string; payload: Partial<RecipeFiltersType> }
) => RecipeFiltersType = (state = initialState, action) => {
  switch (action.type) {
    case RecipeReducerActions.CHANGE_CATEGORY: {
      return state;
    }

    case RecipeReducerActions.CHANGE_DIFFICULTY: {
      return state;
    }

    case RecipeReducerActions.CHANGE_TIME_TO_COOK: {
      return state;
    }

    case RecipeReducerActions.CHANGE_ORDER_BY: {
      return state;
    }

    case RecipeReducerActions.RECIPES_FETCHED: {
      console.log(action.payload.recipes);
      return { ...state, recipes: action.payload.recipes };
    }
    default: {
      return state;
    }
  }
};
