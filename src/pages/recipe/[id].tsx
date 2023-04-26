import React, { useEffect, useState } from "react";
import type { GetStaticProps, InferGetServerSidePropsType } from "next";
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
  const { theme } = useTheme();
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

  if (isLoading) {
    console.log("loading");
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

      <div className="container h-screen">
        <div className="flex w-full flex-grow flex-col flex-wrap py-4 sm:flex-row sm:flex-nowrap">
          <div className="h-full w-full flex-shrink flex-grow-0 px-4 sm:w-1/6 lg:w-[10%]">
            <div className="sticky top-0 h-full w-full rounded-xl bg-gray-100 p-4">
              <ul className="flex content-center justify-center overflow-hidden sm:flex-col">
                <li className="rounded py-2 hover:bg-indigo-300">
                  <a
                    className="truncate sm:flex sm:flex-col sm:justify-center"
                    href="#"
                  >
                    <img
                      src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg"
                      className="mx-4 inline w-7 sm:self-center"
                    />
                    <span className="hidden text-center sm:inline">Home</span>
                  </a>
                </li>
                <li className="rounded py-2 hover:bg-indigo-300">
                  <a
                    className="truncate sm:flex sm:flex-col sm:justify-center"
                    href="#"
                  >
                    <img
                      src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/cog.svg"
                      className="mx-4 inline w-7 sm:self-center"
                    />{" "}
                    <span className="hidden text-center sm:inline">
                      Settings
                    </span>
                  </a>
                </li>
                <li className="rounded py-2 hover:bg-indigo-300">
                  <a
                    className="truncate sm:flex sm:flex-col sm:justify-center"
                    href="#"
                  >
                    <img
                      src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/gift.svg"
                      className="mx-4 inline w-7 sm:self-center"
                    />{" "}
                    <span className="hidden text-center sm:inline">
                      Products
                    </span>
                  </a>
                </li>
                <li className="rounded py-2 hover:bg-indigo-300">
                  <a
                    className="truncate sm:flex sm:flex-col sm:justify-center"
                    href="#"
                  >
                    <img
                      src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/chart-bar.svg"
                      className="mx-4 inline w-7 sm:self-center"
                    />{" "}
                    <span className="hidden text-center sm:inline">
                      Reports
                    </span>
                  </a>
                </li>
                <li className="rounded py-2 hover:bg-indigo-300">
                  <a
                    className="truncate sm:flex sm:flex-col sm:justify-center"
                    href="#"
                  >
                    <img
                      src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/collection.svg"
                      className="mx-4 inline w-7 sm:self-center"
                    />{" "}
                    <span className="hidden text-center sm:inline">
                      Integrations
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <main role="main" className="w-full flex-grow px-3 pt-1 md:w-1/2">
            <Recipe />
            <h1 className="mb-4 text-3xl font-extrabold md:text-5xl" id="home">
              The Holy Grail Layout
            </h1>
            <p className="py-2">
              Are you in search of this? In terms of Web design,{" "}
              <a
                className="text-indigo-600"
                href="https://en.wikipedia.org/wiki/Holy_grail_(web_design)"
              >
                the &quot;holy grail&quot; is page layout
              </a>{" "}
              that has 3 columns. It is commonly desired and implemented, but
              for many years, the various ways in which it could be implemented
              with available technologies all had drawbacks. Because of this,
              finding an optimal implementation was likened to searching for the
              elusive Holy Grail.
            </p>
            <p className="py-2">
              As of 2021, the Holy Grail layout is implemented using CSS Flexbox
              or CSS Grid display. For this example, we&apos;re using the{" "}
              <a className="text-indigo-600" href="https://tailwindcss.com/">
                Tailwind CSS
              </a>{" "}
              utility framework. As part of it&apos;s default classes, Tailwind
              includes
              <a
                className="text-indigo-600"
                href="https://tailwindcss.com/docs/flex-direction"
              >
                Flexbox classes
              </a>{" "}
              which make this implementation possible. The holy grail example is
              also responsive so that the layout stacks vertically on smaller
              mobile screens.
            </p>
            <p className="py-2">
              Many web pages require a layout with multiple (often three)
              columns, with the main page content in one column (often the
              center), and supplementary content such as menus and
              advertisements in the other columns (sidebars). These columns
              commonly require separate backgrounds, with borders between them,
              and should appear to be the same height no matter which column has
              the tallest content. A common requirement is that the sidebars
              have a fixed width, with the center column adjusting in size to
              fill the window (fluid or liquid layout). Another requirement is
              that, when a page does not contain enough content to fill the
              screen, the footer should drop to the bottom of the browser window
              instead of leaving blank space underneath.
            </p>
            <div className="flex hidden rounded bg-indigo-600 p-3 text-white md:flex">
              <span className="flex-shrink overflow-hidden whitespace-nowrap">
                &lt;--------
              </span>
              <div className="flex-shrink-0 flex-grow overflow-ellipsis text-center">
                This center column is "fluid" so it grows in width as needed!
              </div>
              <span className="flex-shrink overflow-hidden whitespace-nowrap">
                --------&gt;
              </span>
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
          </main>
        </div>
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
import { cn } from "../../utils/cn";
import { useTheme } from "next-themes";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.recipe.getRecipeByID.prefetch({ id });
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
