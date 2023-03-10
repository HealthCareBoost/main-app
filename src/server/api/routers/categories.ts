import { z } from "zod";
import { Categories } from "../../../utils/enumsMap";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  setAll: protectedProcedure.mutation(async ({ ctx }) => {
    const defaultCategories = Object.entries(Categories).map(([, value]) => {
      return { name: value };
    });
    console.log(defaultCategories);
    await ctx.prisma.category.createMany({ data: [...defaultCategories] });
    // await ctx.prisma.category.createMany({
    //   data: { ...defaultCategories },
    //   // skipDuplicates: true,
    // });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),

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

        const dataToSave = input.category_ids.map((id: number) => {
          return { recipe_id: recipe.id, category_id: id };
        });

        console.log(dataToSave);

        await ctx.prisma.recipeCategory.createMany({
          data: [...dataToSave],
        });
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
    }),

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

        console.log(recipe);
        console.log(recipe.categories);

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
