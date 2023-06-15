import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import type {
  RecipeInfoResponce,
  GenarateMealResponce,
} from "@/src/utils/apiTypes";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { env } from "@/src/env/server.mjs";
import { v2 as cloudinary } from "cloudinary";
import { addDays } from "date-fns";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

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

  testUpload: publicProcedure
    .input(
      z.object({
        recipe_id: z.string().min(1),
        image_url: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const imageInfo = await cloudinary.uploader.upload(input.image_url);
      console.log(imageInfo);
      return ctx.prisma.recipeImage.create({
        data: {
          recipe_id: input.recipe_id,
          filename: imageInfo.public_id,
          format: imageInfo.format,
          height: imageInfo.height,
          width: imageInfo.width,
          original_extension: imageInfo.format,
          original_filename: imageInfo.original_filename,
          path: `${imageInfo.public_id}.${imageInfo.format}`,
          size_in_bytes: imageInfo.bytes,
          url: imageInfo.secure_url,
        },
      });
    }),

  getDiet: protectedProcedure
    .input(
      z.object({
        timeFrame: z.enum(["day", "week"]),
        date: z.date(),
        targetCalories: z.number().min(0),
        diet: z.string().optional(),
        exclude: z.string().array().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user_id = ctx.session.user.id;
      const mealplanOptions = {
        method: "GET",
        url: `${env.FOOD_API_URL}/recipes/mealplans/generate`,
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
        const dietResponse: AxiosResponse<GenarateMealResponce> =
          await axios.request(mealplanOptions);
        console.log("******* dietResponse ********");

        console.log(dietResponse.data);
        console.log("******* dietResponse ********");

        if (dietResponse.status !== 200) {
          throw Error("blah");
        }

        const recipeIds: string[] = [];
        for (const meal of dietResponse.data.meals) {
          const meal_id = meal.id;
          console.log(`******* ID: ${meal_id} ********`);
          // https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information
          console.log(`${env.FOOD_API_URL}/recipes/${meal_id}/information`);

          const recipeOptions = {
            method: "GET",
            url: `${env.FOOD_API_URL}/recipes/${meal_id}/information`,
            headers: {
              "X-RapidAPI-Key": env.FOOD_API_KEY,
              "X-RapidAPI-Host": env.FOOD_API_HOST,
            },
          };

          const response: AxiosResponse<RecipeInfoResponce> =
            await axios.request(recipeOptions);

          const recipe = response.data;
          console.log(`******* ${recipe.title} ********`);

          const existingRecipe = await ctx.prisma.recipe.findFirst({
            where: {
              name: recipe.title,
            },
          });
          const exists = !!existingRecipe;
          console.log(exists);

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

            // handle images and categories
            const imageInfo = await cloudinary.uploader.upload(recipe.image);
            // console.log(imageInfo);

            const recipe_id = await ctx.prisma.recipe.create({
              data: {
                creator_id: user_id,
                description: recipe.summary,
                difficulty_level: "medium",
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
                images: {
                  create: {
                    filename: imageInfo.public_id,
                    format: imageInfo.format,
                    height: imageInfo.height,
                    width: imageInfo.width,
                    original_extension: imageInfo.format,
                    original_filename: imageInfo.original_filename,
                    path: `${imageInfo.public_id}.${imageInfo.format}`,
                    size_in_bytes: imageInfo.bytes,
                    url: imageInfo.secure_url,
                  },
                },
              },
              select: {
                id: true,
              },
            });
            recipeIds.push(recipe_id.id);
          } else {
            recipeIds.push(existingRecipe.id);
          }
        }

        //update user daily diet
        let count = 1;
        console.log("******* recipeIds ********");
        console.log(recipeIds);
        console.log("******* recipeIds ********");
        for (const recipe_id of recipeIds) {
          await ctx.prisma.userDailyDiet.create({
            data: {
              recipe_id,
              user_id,
              meal_type:
                count === 1
                  ? "BREAKFAST"
                  : count === 2
                  ? "LUNCH"
                  : count === 3
                  ? "DINNER"
                  : "SNACK",
              date: input.date,
            },
          });
          count++;
        }
        return { success: true, meal: recipeIds };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),
});
