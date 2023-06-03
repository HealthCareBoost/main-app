import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import type {
  RecipeInfoResponce,
  GenarateMealResponce,
} from "@/src/utils/apiTypes";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { env } from "@/src/env/server.mjs";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.account.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getDiet: protectedProcedure
    .input(
      z.object({
        timeFrame: z.enum(["day", "week"]),
        targetCalories: z.number().min(0),
        diet: z.string().optional(),
        exclude: z.string().array().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user_id = ctx.session.user.id;
      // {
      //   method: "GET",
      //   url: `${env.FOOD_API_URL}/food/ingredients/${ingredient.id}/information`,
      //   params: { amount: "100", unit: "grams" },
      //   headers: {
      //     "X-RapidAPI-Key": env.FOOD_API_KEY,
      //     "X-RapidAPI-Host": env.FOOD_API_HOST,
      //   },
      // }
      const options = {
        method: "GET",
        url: `${env.FOOD_API_URL}recipes/mealplans/generate`,
        params: {
          timeFrame: input.timeFrame,
          targetCalories: input.targetCalories,
          // diet: input.diet,
          // exclude: ""
        },
        headers: {
          "X-RapidAPI-Key": env.FOOD_API_KEY,
          "X-RapidAPI-Host": env.FOOD_API_HOST,
        },
      };

      try {
        const response: AxiosResponse<GenarateMealResponce> =
          await axios.request(options);
        // console.log(response.data);

        if (response.status !== 200) {
          throw Error("blah");
        }

        for (const meal of response.data.meals) {
          const meal_id = meal.id;
          const options = {
            method: "GET",
            url: `${env.FOOD_API_URL}/recipes/${meal_id}/information`,
            headers: {
              "X-RapidAPI-Key": env.FOOD_API_KEY,
              "X-RapidAPI-Host": env.FOOD_API_HOST,
            },
          };

          const response: AxiosResponse<RecipeInfoResponce> =
            await axios.request(options);
          const recipe = response.data;
          // console.log(response.data);

          const exists = !!(await ctx.prisma.recipe.findFirst({
            where: {
              name: recipe.title,
            },
          }));

          if (!exists) {
            const ingredintsData: {
              name: string;
              measurement_unit: string;
              quantity: number;
            }[] = [];
            for (const ingredient of recipe.extendedIngredients) {
              ingredintsData.push({
                measurement_unit: ingredient.unitLong
                  ? ingredient.unitLong
                  : ingredient.unit,
                name: ingredient.name,
                quantity: ingredient.amount,
              });
            }

            await ctx.prisma.recipe.create({
              data: {
                creator_id: user_id,
                description: recipe.summary,
                difficulty_level: "easy",
                name: recipe.title,
                recipe_steps: recipe.instructions,
                // cooking_time_minutes: 0,
                // preparation_time_minutes: 0,
                total_time_minutes: recipe.readyInMinutes,
                video_url: recipe.sourceUrl,
                ingredients: {
                  createMany: {
                    data: ingredintsData,
                  },
                },
              },
            });
          }
        }
        return { success: true, meal: "" };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),
});
