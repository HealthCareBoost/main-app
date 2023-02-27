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
            user_id_date_recipe_id: {
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
});
