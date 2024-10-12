import React from "react";
import { api } from "@/utils/trpc/server";
import { CreateRecipeForm } from "@/components/recipe/CreateRecipeForm";

const UpdateRecipe = ({ params }: { params: { recipeId: string } }) => {
  const recipeId = params.recipeId;

  void api.recipe.getRecipeByID.prefetch({ id: recipeId });

  return (
    <div className="container">
      <h1
        className={`mb-4 text-center font-poppins text-[52px] font-semibold leading-[75px] text-primaryDark dark:text-white ss:text-[71px] ss:leading-[100px]`}
      >
        Update <span className="text-gradient">Recipe</span>
      </h1>
      <CreateRecipeForm recipeToUpdateId={recipeId} />
    </div>
  );
};

export default UpdateRecipe;
