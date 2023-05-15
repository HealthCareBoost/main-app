import React, { useEffect, useReducer, useState } from "react";
import { type NextPage } from "next";
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
import Layout from "../../components/Layout";
import { Button } from "../../components/ui/Button";

const RecipePreviewPage: NextPage = () => {
  const [recipeState, recipeDispatch] = useReducer(RecipeReducer, initialState);
  const [currentPage, setCurrentPage] = useState(0);

  // const c = api.category.setAll.useMutation().mutate();
  // useEffect(() => {
  //   c();
  // }, []);

  const { fetchNextPage, isFetching, hasNextPage, isLoading, data } =
    api.recipe.getPaginatedRecipies.useInfiniteQuery(
      {
        // cursor: recipeState.cursor,
        take: recipeState.take,
        filters: {
          categoryId: recipeState.selectedCategoryId,
          difficulty: recipeState.selectedDifficulty,
          timeToCook: recipeState.selectedTimeToCook,
          orderBy: recipeState.orderBy,
        },
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
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
      <Layout>
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
      </Layout>
    </RecipeContext.Provider>
  );
};

export default RecipePreviewPage;
