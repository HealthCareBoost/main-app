import React from "react";
import { RecipePreview } from "../../components/recipe/RecipePreview";
import type { RecipesQueryResult } from "../../components/recipe/RecipeReducer";
import type { SwiperNodes } from "../../components/ui/Carousel";
import { SwiperCarousel } from "../../components/ui/Carousel";

export const RecomendedRecipes: React.FC<{
  recipes: RecipesQueryResult[];
}> = ({ recipes }) => {
  const items: SwiperNodes[] = recipes.map((r) => {
    return {
      node: <RecipePreview recipe={r} />,
      key: r.id,
    };
  });
  return (
    <SwiperCarousel
      props={{ slidesPerView: 2, className: "w-full" }}
      items={items}
    />
  );
};
