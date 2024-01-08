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
import { getIngredientNutritionsCollection } from "./ingredients";
import { removeWordsFromArray } from "@/src/utils/removeHTML";
import { MealTypes } from "@prisma/client";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const dietRouter = createTRPCRouter({
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

  /**
   * Test image upload from the server
   *
   * @function
   * @async
   * @name testUpload
   *
   * @param {string} recipe_id - The id of the recipe for which the image is
   * @param {string} image_url - Url of an image

   * @returns {Promise<string | null>} - A Promise that resolves with the ID of the newly created chat or null in case of failure.
   */
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
          input.filters.forEach((filter) => {
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
        // console.log(input);
        const deletedDiet = await ctx.prisma.userDailyDiet.delete({
          where: {
            user_id_recipe_id_date: {
              user_id: ctx.session.user.id,
              recipe_id: input.recipe_id,
              date: input.date,
            },
          },
        });
        // console.log(res);
        return { success: true, diet: deletedDiet };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  /**
   * Generates a diet plan for the authenticated user based on specified parameters.
   *
   * @function
   * @async
   * @name generateDiet
   *
   * @param {("day" | "week")} timeFrame - The time frame for which to generate the diet plan
   * @param {Date} date - The start date of the plan
   * @param {number} targetCalories - The target calorie intake
   * @param {string} diet - The type of diet (optional)
   * @param {string[]} exclude - An array of foods to exclude from the plan (optional)
   *
   * @returns {Promise<{ meal: string[] }>} - A Promise that resolves with an object indicating
   *                the success status of diet generation and an array of generated recipe IDs.
   */
  generateDiet: protectedProcedure
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
      const recipeIds: string[] = [];

      // Create a comma-separated string of restricted foods for API request.
      const restrictedFoods =
        input.exclude && input.exclude.length > 0
          ? input.exclude.reduce((prev, curr) => (prev += `${curr}, `), "")
          : "";

      // Define options for the meal plan generation API request.
      const mealplanOptions = {
        method: "GET",
        url: `${env.FOOD_API_URL}/recipes/mealplans/generate`,
        params: {
          timeFrame: input.timeFrame,
          targetCalories: input.targetCalories,
          // diet: input.diet,
          exclude: restrictedFoods,
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
          throw Error("API error");
        }

        for (const meal of dietResponse.data.meals) {
          const meal_id = meal.id;

          // Make a request to get detailed information about the current recipe
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

          // Check if the recipe exists in the database
          const existingRecipe = await ctx.prisma.recipe.findFirst({
            where: {
              name: recipe.title,
            },
          });
          const exists = !!existingRecipe;
          console.log(exists);

          // If the recipe does not exist, create it in the database.
          if (!exists) {
            const ingredintsData: {
              name: string;
              measurement_unit: string;
              quantity: number;
            }[] = [];

            // Get all ingredients of the recipe.
            for (const ingredient of recipe.extendedIngredients) {
              ingredintsData.push({
                measurement_unit: ingredient.unitLong
                  ? ingredient.unitLong
                  : ingredient.unit,
                name: ingredient.name,
                quantity: ingredient.amount,
              });
            }

            //  upload images and handle categories
            const imageInfo = await cloudinary.uploader.upload(recipe.image);
            // console.log(imageInfo);

            const { id, ingredients } = await ctx.prisma.recipe.create({
              data: {
                creator_id: user_id,
                description: removeWordsFromArray(recipe.summary),
                difficulty_level: "medium",
                name: recipe.title,
                recipe_steps: removeWordsFromArray(recipe.instructions),
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
                ingredients: true,
              },
            });
            recipeIds.push(id);

            // Add nutrition information for each ingredient.
            for (const ingredient of ingredients) {
              await ctx.prisma.$transaction(
                async (prisma) => {
                  const nutritionData = await getIngredientNutritionsCollection(
                    ingredient.name
                  );
                  console.log("nutritionData");
                  console.log(nutritionData);
                  if (nutritionData) {
                    const dataToSave = nutritionData.map((x) => ({
                      ...x,
                      ingredient_id: ingredient.id,
                    }));
                    console.log("dataToSave");
                    console.log(dataToSave);
                    await prisma.nutrients.createMany({
                      data: [...dataToSave],
                    });
                  }
                },
                {
                  maxWait: 5000, // default: 2000
                  timeout: 10000, // default: 5000
                }
              );
            }
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
              // removeTimezoneOffset()
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
