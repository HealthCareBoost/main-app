import React from "react";

import { api, HydrateClient } from "@/utils/trpc/server";
import { RecipeOptions } from "@/components/recipe/RecipeOptions";
import { Recipe } from "@/components/recipe/Recipe";
import { Separator } from "@/components/ui/Separator";

import { RecipeComments } from "@/components/recipe/RecipeComments";
import { RecipeCategories } from "@/components/recipe/RecipeCategories";

// type RecipeOutput = RouterOutputs["recipe"]["getRecipeByID"];
const ViewRecipe = ({ params }: { params: { recipeId: string } }) => {
  const recipe_id = params.recipeId;

  void api.recipe.getRecipeByID.prefetch({
    id: recipe_id,
  });

  void api.recipe.getCommentsForRecipe.prefetch({
    recipe_id,
  });

  void api.recipe.getNutrition.prefetch({
    recipe_id,
  });

  return (
    <HydrateClient>
      <div className="container">
        <div className="flex w-full flex-grow flex-col flex-wrap py-4 sm:flex-row sm:flex-nowrap">
          <RecipeOptions recipe_id={recipe_id} />

          <main role="main" className="w-full flex-grow px-3 pt-1 md:w-1/2">
            <RecipeCategories recipe_id={recipe_id} />
            <Recipe recipe_id={recipe_id} />
            <Separator orientation="horizontal" className="my-4" />
          </main>
        </div>
        <RecipeComments recipe_id={recipe_id} />
      </div>
    </HydrateClient>
  );
};

export default ViewRecipe;
