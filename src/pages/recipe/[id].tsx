import React from "react";
import type { GetStaticProps } from "next";
import { type NextPage } from "next";
import { api } from "../../utils/api";
import Layout from "../../components/Layout";

// type RecipeOutput = RouterOutputs["recipe"]["getRecipeByID"];
const ViewRecipe: NextPage<{ recipe_id: string }> = (
  // props: InferGetServerSidePropsType<typeof getStaticProps>
  { recipe_id }
) => {
  // const router = useRouter();
  // const { id } = router.query;
  // const [resipe, setRecipe] = useState<Recipe | null>(null);
  const { data, isLoading } = api.recipe.getRecipeByID.useQuery({
    // id: props.id,
    id: recipe_id,
  });

  const {
    data: recipeComments,
    isLoading: isCommentsLoading,
    refetch: refetchComments,
  } = api.recipe.getCommentsForRecipe.useQuery({ recipe_id });

  const { data: recipeNutrition } = api.recipe.getNutrition.useQuery({
    recipe_id,
  });

  const onCommentsChange = async () => {
    if (isCommentsLoading) return;
    await refetchComments();
  };

  if (isLoading || isCommentsLoading) {
    console.log("loading");
    console.log(isCommentsLoading);
  }

  if (isLoading || !data || !data.recipe) {
    return (
      <div className="mt-[20%] flex h-full min-h-[300px] w-full items-center justify-center">
        <LoadingSpinner size={128} />
      </div>
    );
  }

  return (
    <Layout>
      <div className="container">
        <div className="flex w-full flex-grow flex-col flex-wrap py-4 sm:flex-row sm:flex-nowrap">
          <RecipeOptions recipe_id={recipe_id} user={data.recipe.user} />

          <main role="main" className="w-full flex-grow px-3 pt-1 md:w-1/2">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                {data.recipe.categories.map(({ category }, idx) => (
                  <li key={`${category.id}${idx}${Math.random()}`}>
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="mr-2 text-sm font-medium text-primaryDark dark:text-white"
                      >
                        {category.name}
                      </a>
                      {/* last element in category array */}
                      {idx + 1 === data.recipe.categories.length ? null : (
                        <svg
                          width="16"
                          height="20"
                          viewBox="0 0 16 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-5 w-4 text-gray-300"
                        >
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <Recipe
                recipe={{
                  ...data.recipe,
                  nutrition: recipeNutrition
                    ? recipeNutrition.nutrition
                    : undefined,
                }}
              />
            </nav>
            <Separator orientation="horizontal" className="my-4" />
          </main>
        </div>
        <div className="mx-auto grid w-3/4 gap-4 p-4 sm:gap-8">
          <div className="mx-auto w-3/4 max-w-3xl px-4" id="comments">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-primaryDark dark:text-white lg:text-2xl">
                Comments ({recipeComments && recipeComments.comments?.length})
              </h2>
            </div>
            <CommentTextarea
              onCommentCreate={() => void onCommentsChange()}
              recipe_id={recipe_id}
            />
          </div>
          {recipeComments &&
            recipeComments.comments &&
            recipeComments.comments.map(
              (comment) => (
                // idx % 2 === 0 ? (
                <PostItem
                  key={comment.id}
                  {...comment}
                  onCommentChange={() => void onCommentsChange()}
                />
                // ) : (
                // <Comment key={comment.id} {...comment} />
              )
              // )
            )}
        </div>
      </div>
    </Layout>
  );
};

export default ViewRecipe;

import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/api/root";
import { prisma } from "../../server/db";
import { Recipe } from "../../components/recipe/Recipe";
import { PostItem } from "../../components/comments/Comment";
import { CommentTextarea } from "../../components/comments/CommentsTextarea";
import { RecipeOptions } from "../../components/recipe/RecipeOptions";
import { Separator } from "../../components/ui/Separator";
import { LoadingSpinner } from "../../components/Loading";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.recipe.getRecipeByID.prefetch({ id });
  await ssg.recipe.getCommentsForRecipe.prefetch({ recipe_id: id });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      recipe_id: id,
    },
  };
};

export function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
