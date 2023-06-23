import { MealTypes } from "@prisma/client";
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

  saveUserDailyDiet: protectedProcedure
    .input(
      z.object({
        date: z.date({
          required_error: "Please select a date and time",
          invalid_type_error: "That's not a date!",
        }),
        // date: z.string(),
        recipe_name: z.string(),
        meal_type: z.nativeEnum(MealTypes),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // console.log("server d");
        // console.log(input);
        const recipe = await ctx.prisma.recipe.findFirstOrThrow({
          where: { name: input.recipe_name },
        });

        const res = await ctx.prisma.userDailyDiet.create({
          data: {
            date: input.date,
            meal_type: input.meal_type,
            user_id: ctx.session.user.id,
            recipe_id: recipe.id,
          },
        });
        console.log(res);
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
    }),

  getUserDiet: publicProcedure
    .input(
      z.object({
        from: z.date().nullable(),
        to: z.date().nullable(),
        filters: z
          .object({
            key: z.string(),
            name: z.nativeEnum(MealTypes),
            checked: z.boolean(),
          })
          .array()
          .nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        if (!ctx.session || !ctx.session.user) {
          // throw Error("Not logged in");
          return { recipes: undefined, success: true };
        }

        if (input.from === null || input.to === null) {
          throw new Error("need 2 valid dates");
        }

        const queryFilters: { NOT: { meal_type: MealTypes } }[] = [];

        if (input.filters && input.filters.length > 0) {
          input.filters.map((filter) => {
            if (!filter.checked) {
              queryFilters.push({
                NOT: { meal_type: filter.key as MealTypes },
              });
            }
          });
        }

        const recipes = await ctx.prisma.userDailyDiet.findMany({
          where: {
            AND: [
              { user_id: ctx.session.user.id },
              {
                date: {
                  lte: input.to,
                  gte: input.from,
                },
              },
              ...queryFilters,
            ],
          },
          include: {
            recipe: {
              select: { name: true },
            },
            // user: {
            //   select: {
            //     id: true,
            //     name: true,
            //   },
            // },
          },
        });
        return { recipes, success: true };
      } catch (error) {
        console.error(error);
        // throw error;
        return { error, success: false };
      }
    }),

  getUserDailyDiet: protectedProcedure
    .input(
      z.object({
        date: z.date(),
        recipe_id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      try {
        return ctx.prisma.userDailyDiet.findUnique({
          where: {
            user_id_recipe_id_date: {
              date: input.date,
              recipe_id: input.recipe_id,
              user_id: ctx.session.user.id,
            },
            // AND: [
            //   { user_id: ctx.session.user.id },
            //   {
            //     date: input.date,
            //   },
            //   { recipe_id: input.recipe_id },
            // ],
          },
          include: {
            recipe: {
              select: { name: true },
            },
          },
        });
      } catch (error) {
        throw error;
      }
    }),

  updateUserDailyDiet: protectedProcedure
    .input(
      z.object({
        date: z.date({
          required_error: "Please select a date and time",
          invalid_type_error: "That's not a date!",
        }),
        previous_recipe_id: z.string(),
        new_recipe_name: z.string().optional(),
        meal_type: z.nativeEnum(MealTypes),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const recipe = await ctx.prisma.recipe.findFirst({
          where: { name: input.new_recipe_name },
        });

        const res = await ctx.prisma.userDailyDiet.updateMany({
          where: {
            // user_id_date_recipe_id: {
            user_id: ctx.session.user.id,
            date: input.date,
            recipe_id: input.previous_recipe_id,
            // },
          },
          data: {
            date: input.date,
            meal_type: input.meal_type,
            user_id: ctx.session.user.id,
            recipe_id:
              input.new_recipe_name && recipe
                ? recipe.id
                : input.previous_recipe_id,
          },
        });
        console.log(res);
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
    }),

  deleteDiet: protectedProcedure
    .input(
      z.object({
        date: z.date({
          required_error: "Please select a date and time",
          invalid_type_error: "That's not a date!",
        }),
        recipe_id: z.string(),
        meal_type: z.nativeEnum(MealTypes),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.prisma.userDailyDiet.delete({
          where: {
            user_id_recipe_id_date: {
              user_id: ctx.session.user.id,
              recipe_id: input.recipe_id,
              date: input.date,
            },
          },
        });
        console.log(res);
        return { success: true };
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
