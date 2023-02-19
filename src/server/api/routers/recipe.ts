import { z } from "zod";
import { RecipeSchema } from "../../../utils/createRecipeSchema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const recipeRouter = createTRPCRouter({
  getRecipeByID: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.recipe.findUnique({
        where: {
          id: input.id,
        },
        include: {
          images: true,
          user: true,
          categories: true,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany({
      include: {
        images: true,
        user: true,
        categories: true,
      },
    });
  }),

  createRecipe: protectedProcedure
    .input(RecipeSchema)
    .mutation(({ ctx, input }) => {
      console.log(input);

      return ctx.prisma.recipe.create({
        data: {
          name: input.name,
          creator_id: ctx.session.user.id,
          cooking_time_minutes: 60,
          recipe_steps: input.recipe_steps,
          description: input.description,
          video_url: input.video_url ? input.video_url : "",
          //       images: {
          //           createMany: {
          //               data: // Array.from({length: 5})
          //           // images data
          //           }
          //   },
          categories: {
            createMany: {
              data: [
                // different categories
              ],
            },
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.recipe.update({
        where: {
          id: input.id,
        },
        data: {
          is_deleted: true,
        },
      });
    }),
});
