import React from "react";
import type { GetStaticProps } from "next";
import { type NextPage } from "next";
// import type { RouterOutputs } from "../../utils/api";
import { api } from "../../utils/api";
// import { useRouter } from "next/router";
// import { LandingNavbar } from "../../components/landing/LandingNavbar";
import { styles } from "../../styles/style";

import dynamic from "next/dynamic";
// import { Recipe } from "@prisma/client";

export const LN = dynamic(
  () =>
    import("../../components/landing/LandingNavbar").then(
      (mod) => mod.LandingNavbar
    ),
  { ssr: false }
);

// type RecipeOutput = RouterOutputs["recipe"]["getRecipeByID"];

const ViewRecipe: NextPage<{ recipe_id: string }> = (
  // props: InferGetServerSidePropsType<typeof getStaticProps>
  { recipe_id }
) => {
  // const { theme } = useTheme();
  // const router = useRouter();
  // const { id } = router.query;
  // const [resipe, setRecipe] = useState<Recipe | null>(null);
  const { data, isLoading } = api.recipe.getRecipeByID.useQuery({
    // id: props.id,
    id: recipe_id,
  });

  const likeRecipe = api.recipe.likeRecipe.useMutation();
  const { data: recipeComments, isLoading: isCommentsLoading } =
    api.recipe.getCommentsForRecipe.useQuery({ recipe_id });

  if (isLoading || isCommentsLoading) {
    console.log("loading");
    console.log(isCommentsLoading);
  }

  // useEffect(() => {}, [id]);

  // return (
  //   <div className="min-h-screen w-full overflow-hidden dark:bg-primaryDark">
  //     <div className={`${styles.paddingX} ${styles.flexCenter}`}>
  //       <LN />
  //     </div>
  //     {/* <section className="h-full w-full overflow-hidden bg-white dark:bg-primaryDark lg:block">
  //       <div className="min-w-full p-4">
  //         <div className="flex flex-col items-center justify-center lg:flex-row">
  //           <aside className="h-[100vh] w-full bg-red-300  lg:w-1/6"></aside>
  //           <main className="h-[100vh] w-full bg-green-300 lg:w-1/2">
  //             <Recipe />
  //           </main>
  //           <aside className="h-[100vh] w-full bg-blue-300 lg:w-1/3"></aside>
  //         </div>
  //       </div>
  //     </section> */}
  //   </div>
  // );
  return (
    <>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <LN />
      </div>

      <div className="container">
        <div className="flex w-full flex-grow flex-col flex-wrap py-4 sm:flex-row sm:flex-nowrap">
          <RecipeOptions recipe_id={recipe_id} />
          <main role="main" className="w-full flex-grow px-3 pt-1 md:w-1/2">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                {Array.from("123456").map((a, idx) => (
                  <li key={`${a}${idx}${Math.random()}`}>
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="mr-2 text-sm font-medium text-primaryDark dark:text-white"
                      >
                        Category
                      </a>
                      {/* last element in category array */}
                      {a === "6" ? null : (
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
            </nav>
            <Recipe />
            <Separator orientation="horizontal" className="my-4" />
          </main>
        </div>
        <CommentTextarea recipe_id={recipe_id} />
        {recipeComments &&
          recipeComments.comments &&
          recipeComments.comments.map((comment, idx) =>
            idx % 2 === 0 ? (
              <Comment key={comment.id} {...comment} />
            ) : (
              <PostItem key={comment.id} {...comment} />
            )
          )}
      </div>
    </>
  );
};

export default ViewRecipe;

import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/api/root";
import { prisma } from "../../server/db";
import { Recipe } from "../../components/recipe/Recipe";
import { Comment, PostItem } from "../../components/comments/Comment";
import { CommentTextarea } from "../../components/comments/CommentsTextarea";
import { RecipeOptions } from "../../components/recipe/RecipeOptions";
import { Separator } from "../../components/ui/Separator";

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
