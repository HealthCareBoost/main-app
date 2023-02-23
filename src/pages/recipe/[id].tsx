import React from "react";
import { type NextPage } from "next";
import Header from "../../components/ui/Header";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

const ViewRecipe: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const a = api.recipe.getRecipeByID.useQuery({ id });
  return (
    <>
      <Header />
    </>
  );
};

export default ViewRecipe;
