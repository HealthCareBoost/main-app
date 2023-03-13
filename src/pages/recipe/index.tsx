import React from "react";
import { type NextPage } from "next";
import Header from "../../components/ui/Header";
import { RecipePreview } from "../../components/recipe/RecipePreview";
import { DifficultyLevel } from "@prisma/client";
import { api } from "../../utils/api";

const RecipePreviewPage: NextPage = () => {
  const res = api.recipe.getAll.useQuery();
  console.log(res.data);

  const recipes = [
    {
      id: "123",
      name: "Beef Hamburger",
      user: { id: "1", name: "john tompson" },
      preparation_time: "2 hours and 30 min",
      cooking_time_minutes: 150,
      difficulty_level: DifficultyLevel.hard,
      image: {
        url: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      },
      categories: ["Burger"],
      liked: true,
      total_likes: 2500,
    },
    {
      id: "1234",
      name: "Beef Hamburger 2",
      user: { id: "1", name: "john tompson" },
      preparation_time: "2 hours",
      cooking_time_minutes: 120,
      difficulty_level: DifficultyLevel.easy,
      image: {
        url: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      },
      categories: [
        "Fast Food",
        "Burger",
        "Fast Food",
        "Burger",
        "Fast Food",
        "Burger",
      ],
      liked: false,
      total_likes: 125,
    },
  ];
  return (
    <>
      <Header />
      {res.data && res.data.length > 0 && <RecipePreview recipes={res.data} />}
    </>
  );
};

export default RecipePreviewPage;
