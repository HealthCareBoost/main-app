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

  /**
   * Retrieves the profile statistics and the preferences of a user
   *
   * @function
   * @async
   * @name getUserProfile
   *
   * @param {string} user_id - The ID of the user
   * @returns {Promise<{ user: UserProfile, userStats: UserProfileStats }>} A Promise that resolves with the user's profile and statistics.
   */
  getUserProfile: publicProcedure
    .input(
      z.object({
        user_id: z.string().min(1),
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

        // Use Prisma's aggregate functions to get user preferences counts in a single query.
        const userPrefStats = await ctx.prisma.userPreferences.groupBy({
          by: ["liked", "made", "saved"],
          _count: true,
          where: {
            user_id: input.user_id,
          },
        });

        const userStats: {
          liked: number;
          saved: number;
          made: number;
          comments: number;
          recipes: number;
        } = {
          liked: userPrefStats.find((stat) => stat.liked)?._count || 0,
          made: userPrefStats.find((stat) => stat.made)?._count || 0,
          saved: userPrefStats.find((stat) => stat.saved)?._count || 0,
          ...user._count,
        };

        return {
          success: true,
          user,
          userStats,
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

  /**
   * Saves user preferences (like, save, made) for a specific recipe.
   *
   * @function
   * @async
   * @name saveUserPreferences
   *
   * @param {string} recipe_id - The ID of the recipe
   * @param {boolean} saved - Is recipe saved by the user (optional).
   * @param {boolean} liked - Is recipe liked by the user (optional).
   * @param {boolean} made - Is recipe made by the user (optional).
   *
   * @returns {Promise<{ success: boolean, error?: any }>} A Promise that resolves with the success status and an optional error.
   */
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

        // Object with fields to save.
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

  /**
   * Adds a comment to a recipe
   *
   * @function
   * @async
   * @name comment
   *
   * @param {string} recipe_id - The ID of the recipe
   * @param {string} text - The text of the comment.
   *
   * @returns {Promise<{ success: boolean, error?: any }>} A Promise that resolves with the success status and an optional error.
   */
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

  /**
   * Delete a comment from a recipe
   *
   * @function
   * @async
   * @name deleteComment
   *
   * @param {string} comment_id - The ID of the comment
   * @returns {Promise<{ success: boolean, error?: any }>} A Promise that resolves with the success status and an optional error.
   */
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

  /**
   * Updates the text of a user's comment
   *
   * @function
   * @async
   * @name updateComment
   *
   * @param {string} comment_id - The ID of the comment
   * @param {string} text - The new text content of the comment
   *
   * @returns {Promise<{ comment: Comment }>} A Promise that resolves with the new comment's data
   */
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

  /**
   * Changes the name of the authenticated user.
   *
   * @function
   * @async
   * @name changeName
   *
   * @param {string} name - The new name for the user
   *
   * @returns {Promise<{ success: boolean, user?: User, error?: any }>}
   *          A Promise that resolves with the success status, updated user data, and an optional error.
   */
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
        return { success: true, user };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  /**
   * Retrieves the total calories consumed by a user on a specific date
   *
   * @function
   * @async
   * @name getUserDailyCalories
   *
   * @param {string} user_id - The ID of the user
   * @param {Date} date - The specific date for which daily calories are calculated
   * @returns {Promise<{ success: boolean, calories?: number, error?: any }>}
   *    A Promise that resolves with the success status, total calories consumed, and an optional error.
   */
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

        // Calculate the total calories from the ingredients' nutrition information.
        let totalCal = 0;

        if (!recipe.ingredients || recipe.ingredients.length <= 0) {
          return {
            success: true,
            calories: totalCal,
          };
        }

        recipe.ingredients.forEach((ingr) => {
          // Check if there is a nutrition information and if there is take the number of calories
          if (ingr.nutrition && ingr.nutrition.length > 0) {
            ingr.nutrition.forEach((nutr) => {
              if (nutr.name === "Calories") {
                totalCal += nutr.amount;
              }
            });
          }
        });

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
