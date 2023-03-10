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

  me: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),

  saveUserDailyDiet: protectedProcedure
    .input(
      z.object({
        date: z.date({
          required_error: "Please select a date and time",
          invalid_type_error: "That's not a date!",
        }),
        // date: z.string(),
        recipe_id: z.string(),
        meal_type: z.nativeEnum(MealTypes),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("server d");
        console.log(input);
        const res = await ctx.prisma.userDailyDiet.create({
          data: {
            date: input.date,
            meal_type: input.meal_type,
            user_id: ctx.session.user.id,
            recipe_id: input.recipe_id,
          },
        });
        console.log(res);
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
    }),

  getUserWeeklyDiet: protectedProcedure
    .input(
      z.object({
        from: z.date().nullable(),
        to: z.date().nullable(),
      })
    )
    .query(({ input, ctx }) => {
      try {
        if (input.from !== null && input.to !== null) {
          return ctx.prisma.userDailyDiet.findMany({
            where: {
              AND: [
                { user_id: ctx.session.user.id },
                {
                  date: {
                    lte: input.to,
                    gte: input.from,
                  },
                },
              ],
            },
            include: {
              recipe: {
                select: { name: true },
              },
            },
          });
        } else {
          throw new Error("need 2 valid dates");
        }
      } catch (error) {
        throw error;
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
        new_recipe_id: z.string().optional(),
        meal_type: z.nativeEnum(MealTypes),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
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
            recipe_id: input.new_recipe_id
              ? input.new_recipe_id
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
        return { success: false };
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

        await ctx.prisma.userPreferences.upsert({
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
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),
});
