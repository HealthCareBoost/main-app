import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure.query(({ ctx }) => {
    const to =
      ctx.session && ctx.session.user && ctx.session.user.name
        ? ctx.session.user.name
        : "World";

    return {
      greeting: `Hello ${to}`,
    };
  }),

  getUserProfile: publicProcedure
    .input(
      z.object({
        user_id: z.string().min(3),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const user_id = input.user_id;
        const user = await ctx.prisma.user.findUniqueOrThrow({
          where: { id: user_id },
          select: {
            _count: {
              select: { comments: true, recipes: true },
            },
            name: true,
            email: true,
            createdAt: true,
            image: true,
          },
        });

        // if (ctx.session && ctx.session.user.id === user_id) {
        //   return { success: true, user: { email, ...rest } };
        // }

        // Not Cool
        const userPrefStats: { liked: number; saved: number; made: number } = {
          liked: 0,
          made: 0,
          saved: 0,
        };

        const { liked } = await ctx.prisma.userPreferences.count({
          where: {
            user_id: input.user_id,
            liked: true,
          },
          select: { liked: true },
        });
        const { made } = await ctx.prisma.userPreferences.count({
          where: {
            user_id: input.user_id,
            made: true,
          },
          select: { made: true },
        });
        const { saved } = await ctx.prisma.userPreferences.count({
          where: {
            user_id: input.user_id,
            saved: true,
          },
          select: { saved: true },
        });

        userPrefStats.liked = liked;
        userPrefStats.made = made;
        userPrefStats.saved = saved;

        return {
          success: true,
          user,
          userStats: {
            ...userPrefStats,
            ...user._count,
          },
        };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  saveName: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const userResult = await ctx.prisma.user.findUnique({
          where: {
            email: input.email,
          },
        });

        if (userResult && userResult.name === null) {
          const nameEmailMap = await ctx.prisma.nameEmailMap.create({
            data: {
              name: input.name,
              email: input.email,
            },
          });
          return { success: true, nameEmailMap };
        }
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
    }),

  mapUserToName: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.nameEmailMap.findUnique({
        where: {
          email: input.email,
        },
      });

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      // user is not saved
      // if(user === null)

      if (result && result.email && result.name && user) {
        const updateName = ctx.prisma.user.update({
          where: {
            email: input.email,
          },
          data: {
            name: result.name,
          },
        });

        const deleteUpdatedName = ctx.prisma.nameEmailMap.delete({
          where: {
            email: input.email,
          },
        });

        return ctx.prisma.$transaction([updateName, deleteUpdatedName]);
        // return { success: true };
      } else {
        return { success: false };
      }
    }),

  saveUserPreferences: protectedProcedure
    .input(
      z.object({
        recipe_id: z.string().min(1),
        saved: z.boolean().optional(),
        made: z.boolean().optional(),
        liked: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const recipe = await ctx.prisma.recipe.findUniqueOrThrow({
          where: {
            id: input.recipe_id,
          },
        });

        const user_id = ctx.session.user.id;

        const filedsToSave: {
          saved?: boolean;
          liked?: boolean;
          made?: boolean;
        } = {};

        if (input.saved !== undefined) {
          filedsToSave.saved = input.saved;
        }
        if (input.liked !== undefined) {
          filedsToSave.liked = input.liked;
        }
        if (input.made !== undefined) {
          filedsToSave.made = input.made;
        }

        const updatePreferences = ctx.prisma.userPreferences.upsert({
          where: {
            user_id_recipe_id: {
              user_id,
              recipe_id: recipe.id,
            },
          },
          update: {
            ...filedsToSave,
          },
          create: {
            user_id,
            recipe_id: recipe.id,
            saved: input.saved !== undefined ? input.saved : false,
            liked: input.liked !== undefined ? input.liked : false,
            made: input.made !== undefined ? input.made : false,
          },
        });

        return ctx.prisma.$transaction([updatePreferences]);
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  comment: protectedProcedure
    .input(
      z.object({
        recipe_id: z.string().min(1),
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user_id = ctx.session.user.id;
        await ctx.prisma.user.findUniqueOrThrow({
          where: { id: user_id },
        });

        const recipe = await ctx.prisma.recipe.findUniqueOrThrow({
          where: { id: input.recipe_id },
        });

        await ctx.prisma.comment.create({
          data: {
            recipe_id: recipe.id,
            user_id,
            text: input.text,
          },
        });
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  deleteComment: protectedProcedure
    .input(
      z.object({
        comment_id: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const comment = await ctx.prisma.comment.delete({
          where: {
            id: input.comment_id,
          },
        });

        if (comment) {
          return { success: true };
        } else {
          throw Error("Comment was not deleted");
        }
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  updateComment: protectedProcedure
    .input(
      z.object({
        comment_id: z.string().min(1),
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const comment = await ctx.prisma.comment.update({
          data: {
            text: input.text,
            edited: true,
            updatedAt: new Date(),
          },
          where: {
            id: input.comment_id,
          },
        });
        return { success: true, comment };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  changeName: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const user = await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            name: input.name,
          },
        });
        console.log(user);
        return { success: true, user };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  getUserStats: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const userStats = await ctx.prisma.user.findFirstOrThrow({
          where: {
            id: input.user_id,
          },
          select: {
            _count: {
              select: {
                comments: true,
                recipes: true,
              },
            },
            createdAt: true,
          },
        });

        const userPrefStats = await ctx.prisma.userPreferences.count({
          where: {
            user_id: input.user_id,
          },
          select: { liked: true, saved: true, made: true },
        });

        return {
          success: true,
          userStats: {
            ...userPrefStats,
            ...userStats._count,
            createdAt: userStats.createdAt,
          },
        };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  getUserDailyCalories: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { recipe } = await ctx.prisma.userDailyDiet.findFirstOrThrow({
          where: {
            user_id: input.user_id,
            date: input.date,
          },
          select: {
            recipe: {
              include: {
                ingredients: {
                  select: { nutrition: true },
                },
              },
            },
          },
        });

        let totalCal = 0;
        if (recipe.ingredients && recipe.ingredients.length > 0) {
          recipe.ingredients.forEach((ingr) => {
            if (ingr.nutrition && ingr.nutrition.length > 0) {
              ingr.nutrition.forEach((nutr) => {
                if (nutr.name === "Calories") {
                  totalCal += nutr.amount;
                }
              });
            }
          });
        }

        return {
          success: true,
          calories: totalCal,
        };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),
});
