import type { Prisma, PrismaClient } from "@prisma/client";
import type { RecipeInfoResponce } from "./apiTypes";

export const getRecipeCategories: (
  recipe: RecipeInfoResponce,
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => Promise<number[]> = async (recipe, prisma) => {
  const categories: number[] = [];

  // check vegan, vegetarian and othe bools
  // + diets array to get cat names

  await prisma.category.findFirst({
    where: { name: "" },
  });

  return categories;
};
