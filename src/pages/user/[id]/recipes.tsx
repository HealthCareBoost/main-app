import { type NextPage } from "next";
import React, { useEffect, useState } from "react";
import type { RouterOutputs } from "../../../utils/api";
import { api } from "../../../utils/api";
import { LoadingSpinner } from "@/src/components/Loading";
import { RecipePreview } from "@/src/components/recipe/RecipePreview";
import type { RecipesQueryResult } from "@/src/components/recipe/RecipeReducer";
import { Separator } from "@/src/components/ui/Separator";
import { cn } from "@/src/utils/cn";
import type { InfiniteData } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Layout from "../../../components/Layout";
import { Button, buttonVariants } from "../../../components/ui/Button";

type InteractedRecipesResult = Pick<
  RouterOutputs["recipe"]["getInteractedRecipes"],
  "recipes"
>;
type InfiniteInteractedRecipes =
  | InfiniteData<InteractedRecipesResult>
  | undefined;

const UserRecipePage: NextPage<{ user_id: string }> = ({ user_id }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [recipes, setRecipes] = useState<RecipesQueryResult[] | undefined>(
    undefined
  );
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [pref, setPref] = useState<{
    liked: boolean;
    saved: boolean;
    made: boolean;
  }>({ liked: true, saved: false, made: false });
  const { data: sessionData } = useSession();

  const sidebarNavItems = [
    {
      title: "Liked",
      onClick: () => {
        setPref((prev) => {
          return { ...prev, liked: !prev.liked };
        });
      },
      selected: pref.liked,
    },
    {
      title: "Saved",
      onClick: () => {
        setPref((prev) => {
          return { ...prev, saved: !prev.saved };
        });
      },
      selected: pref.saved,
    },
    {
      title: "Made",
      onClick: () => {
        setPref((prev) => {
          return { ...prev, made: !prev.made };
        });
      },
      selected: pref.made,
    },
    // {
    //   title: "Owned",
    //   onClick: () => {
    //     setPref((prev) => {
    //       return { ...prev, owned: !prev.owned };
    //     });
    //   },
    //   selected: pref.owned,
    // },
  ];

  const { fetchNextPage, isFetching, hasNextPage, isLoading, data } =
    api.recipe.getInteractedRecipes.useInfiniteQuery(
      {
        user_id,
        // user_id: sessionData ? sessionData.user.id : "",
        take: 12,
        filters: {
          ...pref,
        },
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  // console.log(data);

  useEffect(() => {
    function fetchRecipes() {
      if (!sessionData || !sessionData.user) {
        return;
      }

      //
      if (data) {
        // console.log(data);
        const currentPageRecipes = data.pages[currentPage]?.recipes;
        console.log(currentPageRecipes);
        setRecipes(currentPageRecipes);

        const nextCursor = data?.pages[currentPage]?.nextCursor;
        setCursor(nextCursor);
      }
    }
    fetchRecipes();
  }, [data, isLoading, currentPage, sessionData]);

  useEffect(() => {
    console.log(pref);
  }, [pref]);

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

  if (isLoading) {
    return (
      <div className="mt-[20%] flex min-h-[300px] w-full items-center justify-center">
        <LoadingSpinner size={128} />
      </div>
    );
  }

  return (
    <Layout>
      <>
        <div className="container h-full space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
              Favourite Recipes
            </h2>
            <p className="text-muted-foreground">
              Take a look at your favourite recipes and cooking preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1">
              {recipes !== undefined && recipes.length > 0 ? (
                <div className="xs:p-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    {recipes.map((recipe) => (
                      <RecipePreview key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
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
                      disabled={isFetching || !cursor}
                      onClick={() => void handleFetchNextPage()}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-[20%] flex min-h-[300px] w-full justify-center">
                  No Recepies Found.
                </div>
              )}
            </div>
          </div>
        </div>
      </>
      {/* <section className="container h-full w-full overflow-hidden bg-white dark:bg-primaryDark lg:block">
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
        </section> */}
    </Layout>
  );
};

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    onClick: () => void;
    title: string;
    selected: boolean;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 text-primaryDark dark:text-white lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item, idx) => (
        <Button
          key={`${item.title}${idx}`}
          // href={item.href}
          onClick={item.onClick}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            item.selected
              ? "inline-flex h-9 w-full items-center justify-start rounded-md bg-slate-200 px-2 text-sm font-medium text-primaryDark transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800"
              : "inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-medium text-primaryDark transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent",
            // pathname === item.href
            // ? "bg-muted hover:bg-muted"
            // : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Button>
      ))}
    </nav>
  );
}
export default UserRecipePage;

import { appRouter } from "@/src/server/api/root";
import { prisma } from "@/src/server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { GetStaticProps } from "next";
import superjson from "superjson";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.recipe.getInteractedRecipes.prefetch({ user_id: id });

  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      user_id: id,
    },
  };
};

export function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
