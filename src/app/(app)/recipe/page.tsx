"use client";
import React, { useEffect, useReducer, useState } from "react";
import { api } from "@/utils/trpc/react";
import { RecipeContext } from "@/components/recipe/RecipeContext";
import { CategorySidebar } from "@/components/recipe/CategorySidebar";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";
import { Button } from "@/components/ui/Button";
import {
  initialState,
  RecipeReducer,
  RecipeReducerActions,
} from "@/components/recipe/RecipeReducer";

const RecipePreviewPage = () => {
  const [recipeState, recipeDispatch] = useReducer(RecipeReducer, initialState);
  const [currentPage, setCurrentPage] = useState(0);

  const { fetchNextPage, isFetching, isLoading, data } =
    api.recipe.getPaginatedRecipes.useInfiniteQuery(
      {
        // cursor: recipeState.cursor,
        take: recipeState.take,
        filters: {
          categoryId: recipeState.selectedCategoryId,
          difficulty: recipeState.selectedDifficulty,
          timeToCook: recipeState.selectedTimeToCook,
          orderBy: recipeState.orderBy,
          searched_recipe: recipeState.searched_recipe,
        },
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );
  // console.log(data);
  const nextCursor = data?.pages[currentPage]?.nextCursor;

  useEffect(() => {
    function fetchRecipes() {
      if (isLoading) {
        return;
      }
      if (data) {
        console.log(data);
        // const allRecipes = data.pages.flatMap((page) => page.recipes) ?? [];
        const recipes = data.pages[currentPage]?.recipes;
        recipeDispatch({
          type: RecipeReducerActions.RECIPES_FETCHED,
          payload: { recipes },
        });
      }
    }
    fetchRecipes();
  }, [data, isLoading, currentPage]);

  const handleFetchNextPage = async () => {
    await fetchNextPage();
    setCurrentPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const returnToFirstPage = () => {
    setCurrentPage(0);
  };

  return (
    <RecipeContext.Provider
      value={{ recipeDispatch, recipeState, returnToFirstPage }}
    >
      <section className="container h-full w-full overflow-hidden bg-white dark:bg-primaryDark lg:block">
        <div className="p-4">
          <div className="rounded-md shadow-2xl transition-all">
            <div className="grid grid-cols-4 xl:grid-cols-5">
              <CategorySidebar />
              <div className="col-span-5 ss:col-span-3 ss:border-l ss:border-l-dimWhite ss:dark:border-l-slate-700 xl:col-span-4">
                <div className="h-full px-8 py-6">
                  <RecipeGrid />
                  <div className="flex flex-row items-center justify-end">
                    <Button
                      className="bg-orange-gradient text-primaryDark"
                      disabled={currentPage <= 0}
                      onClick={() => void handleFetchPreviousPage()}
                    >
                      Prev
                    </Button>
                    <span className="mx-4">{currentPage + 1}</span>
                    <Button
                      className="bg-orange-gradient text-primaryDark"
                      disabled={isFetching || !nextCursor}
                      onClick={() => void handleFetchNextPage()}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RecipeContext.Provider>
  );
};

export default RecipePreviewPage;
