import React from "react";
import { RecipePreview } from "../../components/recipe/RecipePreview";
import type { RecipesQueryResult } from "../../components/recipe/RecipeReducer";
import type { SwiperNodes } from "../../components/ui/SwiperCarousel";
import { SwiperCarousel } from "../../components/ui/SwiperCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/Carousel";

import useWindowDimensions from "../../hooks/useMediaQuery";
import { WindowSizes } from "../../utils/constants";
import { CAROUSEL_TYPE } from "@/src/utils/constants";

export const RecomendedRecipes: React.FC<{
  recipes: RecipesQueryResult[];
}> = ({ recipes }) => {
  const { width } = useWindowDimensions();
  // console.log(width);
  const items: SwiperNodes[] = recipes.map((r) => {
    return {
      node: (
        <div className="mx-auto h-96 w-80 max-w-xs lg:w-72">
          <RecipePreview recipe={r} />
        </div>
      ),
      key: r.id,
    };
  });

  return (
    <>
      {CAROUSEL_TYPE === "swiper" ? (
        <SwiperCarousel
          props={{
            slidesPerView: slidesPerWindowWidth(width),
            className: "w-full",
          }}
          items={items}
        />
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1">
            {items.map((item, idx) => (
              <CarouselItem
                key={`${item.key}-${idx}`}
                className="pl-2 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
              >
                {item.node}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </>
  );
};

const slidesPerWindowWidth: (width: number | undefined) => number = (width) => {
  if (!width) return 1;
  if (width <= WindowSizes.sm) {
    // console.log("width <= sm");
    // console.log(width <= WindowSizes.sm);
    return 1;
  }

  if (width <= WindowSizes.md) {
    // console.log("width <= md");
    // console.log(width <= WindowSizes.lg);
    return 2;
  }

  if (width <= WindowSizes.lg) {
    // console.log("width <= lg");
    // console.log(width <= WindowSizes.lg);
    return 3;
  }
  if (width >= WindowSizes.lg) {
    // console.log("width >= xl");
    // console.log(width >= WindowSizes.xl);
    return 4;
  }
  return 1;
};
