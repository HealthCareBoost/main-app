import React, { useContext } from "react";
import { LoadingSpinner } from "../Loading";
import { Separator } from "../ui/Separator";
import { RecipeContext } from "./RecipeContext";
import { RecipePreview } from "./RecipePreview";
import { type RecipesQueryResult } from "./RecipeReducer";

export const RecipeGrid: React.FC = () => {
  const { recipeState } = useContext(RecipeContext);

  return (
    <div
      className="rounded-md border border-none border-slate-200 p-0 dark:border-slate-700"
      style={{ animationDuration: "0s" }} //"animation-duration: 0s"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Listen Now</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Top picks for you. Updated daily.
          </p>
        </div>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      {renderContent(recipeState.recipes)}
    </div>
  );
};

const renderContent = (recipes: RecipesQueryResult) => {
  if (recipes !== undefined && recipes.length > 0) {
    return <RecipePreview recipes={recipes} />;
  } else {
    return (
      <div className="mt-[20%] flex h-full min-h-[300px] w-full items-center justify-center">
        <LoadingSpinner size={128} />
      </div>
    );
  }
};
