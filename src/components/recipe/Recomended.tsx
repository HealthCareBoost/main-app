import React from "react";
import { RecipePreview } from "../../components/recipe/RecipePreview";
import type { RecipesQueryResult } from "../../components/recipe/RecipeReducer";
import type { SwiperNodes } from "../../components/ui/Carousel";
import { SwiperCarousel } from "../../components/ui/Carousel";
import useWindowDimensions from "../../hooks/useMediaQuery";
import { WindowSizes } from "../../utils/constants";

export const RecomendedRecipes: React.FC<{
  recipes: RecipesQueryResult[];
}> = ({ recipes }) => {
  const { width } = useWindowDimensions();
  // console.log(width);
  const items: SwiperNodes[] = recipes.map((r) => {
    return {
      node: (
        <div className="h-96 w-80">
          <RecipePreview recipe={r} />
        </div>
      ),
      key: r.id,
    };
  });
  return (
    <SwiperCarousel
      props={{
        slidesPerView: slidesPerWindowWidth(width),
        className: "w-full",
      }}
      items={items}
    />
  );
};

const slidesPerWindowWidth: (width: number | undefined) => number = (width) => {
  if (!width) return 1;
  if (width <= WindowSizes.sm) {
    console.log("width <= sm");
    console.log(width <= WindowSizes.sm);
    return 1;
  }
  if (width <= WindowSizes.lg) {
    console.log("width <= lg");
    console.log(width <= WindowSizes.lg);
    return 2;
  }
  if (width >= WindowSizes.lg) {
    console.log("width >= xl");
    console.log(width >= WindowSizes.xl);
    return 4;
  }
  return 1;
};
