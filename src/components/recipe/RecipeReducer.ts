import type { DifficultyLevel, Recipe, RecipeImage } from "@prisma/client";
import { Constants } from "../../utils/constants";
import type { OrderByValues } from "../../utils/enumsMap";

export type RecipesQueryResult = Recipe & {
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
};

export type RecipeFiltersType = {
  take: number;
  cursor: string | undefined;
  selectedCategoryId: number | undefined;
  selectedDifficulty: DifficultyLevel | undefined;
  selectedTimeToCook:
    | {
        higher: number;
        lower: number;
      }
    | undefined;
  orderBy: OrderByValues | undefined;
  recipes: RecipesQueryResult[] | undefined;
};

export const RecipeReducerActions = {
  RECIPES_FETCHED: "RECIPES_FETCHED",
  CHANGE_CATEGORY: "CHANGE_CATEGORY",
  CHANGE_DIFFICULTY: "CHANGE_DIFFICULTY",
  CHANGE_TIME_TO_COOK: "CHANGE_TIME_TO_COOK",
  CHANGE_ORDER_BY: "CHANGE_ORDER_BY",
} as const;

export const initialState = {
  take: Constants.DEFAULT_SELECT_NUMBER,
  cursor: undefined,
  selectedCategoryId: undefined,
  selectedDifficulty: undefined,
  selectedTimeToCook: undefined,
  orderBy: undefined,
  recipes: [] as RecipesQueryResult[],
};

export const RecipeReducer: (
  state: RecipeFiltersType,
  action: { type: string; payload: Partial<RecipeFiltersType> }
) => RecipeFiltersType = (state = initialState, action) => {
  switch (action.type) {
    case RecipeReducerActions.CHANGE_CATEGORY: {
      console.log(action.payload.selectedCategoryId);
      return {
        ...state,
        orderBy: action.payload.orderBy,
        selectedCategoryId: action.payload.selectedCategoryId,
      };
    }

    case RecipeReducerActions.CHANGE_DIFFICULTY: {
      console.log(action.payload.selectedDifficulty);
      return {
        ...state,
        orderBy: action.payload.orderBy,
        selectedDifficulty: action.payload.selectedDifficulty,
      };
    }

    case RecipeReducerActions.CHANGE_TIME_TO_COOK: {
      console.log(action.payload.selectedTimeToCook);
      return {
        ...state,
        orderBy: action.payload.orderBy,
        selectedTimeToCook: action.payload.selectedTimeToCook,
      };
    }

    case RecipeReducerActions.CHANGE_ORDER_BY: {
      console.log(action.payload.orderBy);
      return { ...state, orderBy: action.payload.orderBy };
    }

    case RecipeReducerActions.RECIPES_FETCHED: {
      console.log(action.payload);
      return {
        ...state,
        cursor: action.payload.cursor,
        recipes: action.payload.recipes,
      };
    }
    default: {
      return state;
    }
  }
};
