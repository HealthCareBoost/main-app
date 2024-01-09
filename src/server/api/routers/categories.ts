import { z } from "zod";
import { Categories } from "../../../utils/enumsMap";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  /**
   * Sets default categories in the database.
   *
   * @function
   * @async
   * @name setAll
   *
   * @returns {Promise<void>} A Promise that resolves once the default categories
   *                            are successfully created in the database.
   */
  setAll: protectedProcedure.mutation(async ({ ctx }) => {
    const defaultCategories = Object.entries(Categories).map(([, value]) => {
      return { name: value };
    });
    await ctx.prisma.category.createMany({ data: [...defaultCategories] });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),

  /**
   * Adds categories to a recipe in the database.
   *
   * @function
   * @async
   * @name addToRecipe
   *
   * @param {string} recipe_id - The ID of the recipe to which categories will be added
   * @param {number[]} category_ids - An array of category IDs to be added
   *
   * @returns {Promise<{ success: boolean }>}
   */
  addToRecipe: protectedProcedure
    .input(
      z.object({
        recipe_id: z.string(),
        category_ids: z.coerce.number().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user_id = ctx.session.user.id;
        const recipe = await ctx.prisma.recipe.findFirstOrThrow({
          where: {
            AND: [
              {
                id: input.recipe_id,
              },
              {
                creator_id: user_id,
              },
            ],
          },
        });

        const categoryData = input.category_ids.map((id: number) => {
          return { recipe_id: recipe.id, category_id: id };
        });

        await ctx.prisma.recipeCategory.createMany({
          data: [...categoryData],
        });
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
    }),

  /**
   * Removes categories from a recipe
   *
   * @function
   * @async
   * @name removeFromRecipe
   *
   * @param {string} input.recipe_id - The ID of the recipe from which categories will be removed
   * @param {number[]} input.category_ids - An array of category IDs
   *
   * @returns {Promise<{ success: boolean }>}
   */
  removeFromRecipe: protectedProcedure
    .input(
      z.object({
        recipe_id: z.string(),
        category_ids: z.coerce.number().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user_id = ctx.session.user.id;
        const recipe = await ctx.prisma.recipe.findFirstOrThrow({
          where: {
            AND: [
              {
                id: input.recipe_id,
              },
              {
                creator_id: user_id,
              },
            ],
          },
          include: {
            categories: true,
          },
        });

        if (recipe.categories.length === 0) {
          throw new Error("Recipe does not have categories");
        }

        if (input.category_ids.length > 0) {
          await ctx.prisma.recipeCategory.deleteMany({
            where: {
              AND: [
                {
                  recipe_id: input.recipe_id,
                },
                {
                  category_id: {
                    in: input.category_ids,
                  },
                },
              ],
            },
          });
        }
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
    }),
});
