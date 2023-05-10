"use client";
import React from "react";
import type { NextPage } from "next";

import { api } from "../../../utils/api";
import Layout from "../../../components/Layout";
import { CreateRecipeForm } from "../../../components/recipe/CreateRecipeForm";
import { RecipeMapper } from "../../../utils/recipeMapper";
import { LoadingSpinner } from "../../../components/Loading";

const UpdateRecipe: NextPage<{ recipe_id: string }> = ({ recipe_id }) => {
  const { data, isLoading } = api.recipe.getRecipeByID.useQuery({
    id: recipe_id,
  });

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
        <h1
          className={`mb-4 text-center font-poppins text-[52px] font-semibold leading-[75px] text-primaryDark dark:text-white ss:text-[71px] ss:leading-[100px]`}
        >
          Update{" "}
          <span className="text-gradient">
            {" "}
            {data.recipe.name ? data.recipe.name : "Recipe"}{" "}
          </span>
        </h1>
        <CreateRecipeForm recipeToUpdate={data} />
      </div>
    </Layout>
  );
};

export default UpdateRecipe;

import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { prisma } from "../../../server/db";
import type { GetStaticProps } from "next";

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
