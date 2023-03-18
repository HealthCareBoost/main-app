import React, { useEffect, useReducer } from "react";
import { type NextPage } from "next";
import { LandingNavbar } from "../../components/landing/LandingNavbar";
import { CategorySidebar } from "../../components/recipe/CategorySidebar";
import { RecipeGrid } from "../../components/recipe/RecipeGrid";
import { styles } from "../../styles/style";
import { RecipeContext } from "../../components/recipe/RecipeContext";
import { api } from "../../utils/api";
import {
  initialState,
  RecipeReducer,
  RecipeReducerActions,
} from "../../components/recipe/RecipeReducer";

const RecipePreviewPage: NextPage = () => {
  const [recipeState, recipeDispatch] = useReducer(RecipeReducer, initialState);

  const { isLoading, data } = api.recipe.getPaginatedRecipies.useQuery({
    take: recipeState.take,
    cursor: recipeState.cursor,
    filters: {
      categoryId: recipeState.selectedCategoryId,
      difficulty: recipeState.selectedDifficulty,
      timeToCook: recipeState.selectedTimeToCook,
      orderBy: recipeState.orderBy,
    },
  });
  console.log(data);

  useEffect(() => {
    function fetchRecipes() {
      if (isLoading) {
        return;
      }
      if (data) {
        recipeDispatch({
          type: RecipeReducerActions.RECIPES_FETCHED,
          payload: { recipes: data },
        });
      }
    }
    fetchRecipes();
  }, [data, isLoading]);

  return (
    <RecipeContext.Provider value={{ recipeDispatch, recipeState }}>
      <div className="w-full overflow-hidden dark:bg-primaryDark">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <LandingNavbar />
        </div>
        <section className="h-full w-full overflow-hidden bg-white dark:bg-primaryDark lg:block">
          <div className="p-4">
            <div className="rounded-md shadow-2xl transition-all">
              <div className="grid grid-cols-4 xl:grid-cols-5">
                <CategorySidebar />
                <div className="col-span-5 ss:col-span-3 ss:border-l ss:border-l-dimWhite ss:dark:border-l-slate-700 xl:col-span-4">
                  <div className="h-full px-8 py-6">
                    <RecipeGrid />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </RecipeContext.Provider>
  );
};

export default RecipePreviewPage;
