import React, { useContext } from "react";
import { LoadingSpinner } from "../Loading";
import { Separator } from "../ui/Separator";
import { RecipeContext } from "./RecipeContext";
import { RecipePreview } from "./RecipePreview";
import { RecipeReducerActions, type RecipesQueryResult } from "./RecipeReducer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import type { OrderByValues } from "../../utils/enumsMap";
import { RecipeFiltersMap } from "../../utils/enumsMap";

export const RecipeGrid: React.FC = () => {
  const { recipeState, recipeDispatch, returnToFirstPage } =
    useContext(RecipeContext);

  return (
    <div
      className="rounded-md border border-none border-slate-200 p-0 dark:border-slate-700"
      style={{ animationDuration: "0s" }} //"animation-duration: 0s"
    >
      <div className="flex items-center justify-between">
        <div className="grid w-full gap-4 space-y-1 ss:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Latest Recipes
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Top picks for you. Updated daily.
            </p>
          </div>
          <Select
            onValueChange={(value) => {
              recipeDispatch({
                type: RecipeReducerActions.CHANGE_ORDER_BY,
                payload: {
                  orderBy: value as OrderByValues,
                },
              });
              returnToFirstPage();
            }}
          >
            <SelectTrigger className="w-[180px] justify-self-end">
              <SelectValue placeholder="Order By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(RecipeFiltersMap).map(([key, val]) => {
                  return (
                    <SelectItem value={key} key={key}>
                      {val}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      {renderContent(recipeState.recipes)}
    </div>
  );
};

const renderContent = (recipes: RecipesQueryResult[] | undefined) => {
  if (recipes !== undefined && recipes.length > 0) {
    return (
      <div className="xs:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipePreview key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-[20%] flex h-full min-h-[300px] w-full items-center justify-center">
        <LoadingSpinner size={128} />
      </div>
    );
  }
};
