import { type Recipe, type RecipeImage } from "@prisma/client";
import React from "react";
import { api } from "../../utils/api";
import { Separator } from "../ui/Separator";
import { RecipePreview } from "./RecipePreview";

export const RecipeGrid: React.FC = () => {
  const recipesQuery = api.recipe.getPaginatedRecipies.useQuery({});
  console.log(recipesQuery.data);

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
      {recipesQuery.data && recipesQuery.data.length > 0 && (
        <RecipePreview
          recipes={
            Array.from("123456789").map(
              () => recipesQuery.data[0]
            ) as (Recipe & {
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
          }
        />
      )}
    </div>
  );
};
