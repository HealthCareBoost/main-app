import type { Prisma, PrismaClient } from "@prisma/client";
import type { RecipeInfoResponce } from "./apiTypes";
import type { InternalArgs } from "@prisma/client/runtime/library";

export const getRecipeCategories: (
  recipe: RecipeInfoResponce,
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, InternalArgs>,
) => Promise<number[]> = async (recipe, prisma) => {
  const categories: number[] = [];

  // check vegan, vegetarian and othe bools
  // + diets array to get cat names

  await prisma.category.findFirst({
    where: { name: "" },
  });

  return categories;
};
