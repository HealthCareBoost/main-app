import { DifficultyLevel } from "@prisma/client";
import type { RecipeImage, Prisma } from "@prisma/client";
import { z } from "zod";
import { Constants } from "../../../utils/constants";
import { RecipeSchema } from "../../../utils/validations/createRecipeSchema";
import { ImageInfoSchema } from "../../../utils/validations/imageSchema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { getFiltersForQuery } from "../../../utils/mapFilters";
import { timeToMinutes } from "../../../utils/timeConverter";
import { getIngredientNutritionsCollection } from "./ingredients";

export const recipeRouter = createTRPCRouter({
  /**
   * Retrieves a recipe with a specific ID from the database.
   *
   * @function
   * @async
   * @name getRecipeByID
   *
   * @param {string} input.id - The ID of the recipe to retrieve.
   *
   * @returns {Promise<Recipe>} - A Promise that resolves with the recipe object
   *                              that matches the specified ID.
   */
  getRecipeByID: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const recipe = await ctx.prisma.recipe.findUniqueOrThrow({
          where: {
            id: input.id,
          },
          include: {
            images: true,
            user: true,
            categories: {
              select: {
                category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            ingredients: true,
          },
        });

        // const ingredients = await ctx.prisma.ingredients.findMany({

        // });

        return { success: true, recipe };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  /**
   * Retrieves all recipes from the database.
   *
   * @function
   * @async
   * @name getAll
   *
   * @returns {Promise<Recipe[]>} - A Promise that resolves with an array of
   *                                recipe objects.
   *
   */
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany({
      include: {
        user: {
          select: { name: true, id: true },
        },
        categories: {
          select: {
            category: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        images: true,
      },
    });
  }),

  /**
   * Creates a new recipe in the database.
   *
   * @function
   * @async
   * @name createRecipe
   *
   * @param {typeof RecipeSchema} input - An object containing the recipe data to be created.
   * @returns {Promise<Recipe>} - A Promise that resolves with the newly created recipe object.
   *
   */
  createRecipe: protectedProcedure
    .input(RecipeSchema)
    .mutation(async ({ ctx, input }) => {
      console.log("crm");
      console.log(input);

      const imageDataToSave: Omit<
        RecipeImage,
        "id" | "is_deleted" | "updatedAt" | "recipe_id"
      >[] = input.images
        ? input.images.map((imageInfo) => {
            return {
              // recipe_id: "1234567",
              path: imageInfo.path,
              filename:
                imageInfo.public_id && imageInfo.folder
                  ? (imageInfo.public_id
                      .split(`${imageInfo.folder}/`)
                      .pop() as string)
                  : imageInfo.public_id,
              original_filename: imageInfo.original_filename,
              original_extension: imageInfo.original_extension,
              format: imageInfo.format,
              size_in_bytes: imageInfo.bytes,
              createdAt: new Date(imageInfo.created_at),
              width: imageInfo.width,
              height: imageInfo.height,
              url: imageInfo.secure_url,
            };
          })
        : [];

      const ingredientsData = [];

      for (const ingredient of input.ingredients) {
        // const exists = !!(await ctx.prisma.ingredients.findFirst({
        //   where: {
        //     name: ingredient.ingredient_name,
        //   },
        // }));

        // if (!exists) {
        // getnutr info
        ingredientsData.push({
          quantity: ingredient.quantity,
          measurement_unit: ingredient.measurement_unit,
          name: ingredient.ingredient_name,
        });
        // }
      }
      console.log("ingredientsData");
      console.log(ingredientsData);

      // ctx.prisma.nutrients.createMany({
      // data: [{}],
      // });

      const recipe = await ctx.prisma.recipe.create({
        data: {
          creator_id: ctx.session.user.id,
          name: input.name,
          cooking_time_minutes: timeToMinutes(
            input.cookingHours,
            input.cookingMinutes
          ),
          preparation_time_minutes: timeToMinutes(
            input.preparationHours,
            input.preparationMinutes
          ),
          description: input.description,
          difficulty_level: input.difficultyLevel,
          recipe_steps: input.recipe_steps,
          video_url: input.video_url ? input.video_url : "No video",
          images: {
            createMany: {
              data: imageDataToSave,
              skipDuplicates: true,
            },
          },

          ingredients: {
            create: ingredientsData,
          },

          // categories: {
          //   createMany: {
          //     data: [
          //       // different categories
          //     ],
          //   },
          // },
        },
        include: {
          ingredients: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      console.log("ingredients after save");
      console.log(recipe.ingredients);

      for (const ingredient of recipe.ingredients) {
        const nd = await getIngredientNutritionsCollection(
          ingredient.name,
          ingredient.id
        );
        console.log("nd");
        console.log(nd);
        if (nd) {
          await ctx.prisma.nutrients.createMany({
            data: [...nd],
          });
        }
      }

      return {
        success: true,
        recipe,
      };
    }),

  /**
   * Deletes a recipe from the database.
   *
   * @function
   * @async
   * @name delete
   *
   * @param {string} input.id - The ID of the recipe to be deleted.
   *
   * @returns {Promise<object>} - A Promise that resolves with the updated recipe object.
   *
   */
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

  addImages: protectedProcedure
    .input(ImageInfoSchema)
    .mutation(async ({ ctx, input }) => {
      console.log("******************2");
      console.log(input);

      const imageDataToSave: Omit<
        RecipeImage,
        "id" | "is_deleted" | "updatedAt"
      >[] = input.map((imageInfo) => {
        return {
          recipe_id: "1234567",
          path: imageInfo.path,
          filename:
            imageInfo.public_id && imageInfo.folder
              ? (imageInfo.public_id
                  .split(`${imageInfo.folder}/`)
                  .pop() as string)
              : imageInfo.public_id,
          original_filename: imageInfo.original_filename,
          original_extension: imageInfo.original_extension,
          format: imageInfo.format,
          size_in_bytes: imageInfo.bytes,
          createdAt: new Date(imageInfo.created_at),
          width: imageInfo.width,
          height: imageInfo.height,
          url: imageInfo.secure_url,
        };
      });

      await ctx.prisma.recipeImage.createMany({
        data: imageDataToSave,
        skipDuplicates: true,
      });
    }),

  getPaginatedRecipies: publicProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        take: z.number().positive().optional(),
        filters: z
          .object({
            categoryId: z.number().positive().optional(),
            difficulty: z.nativeEnum(DifficultyLevel).optional(),
            timeToCook: z
              .object({
                lower: z.number().min(0),
                higher: z
                  .number()
                  .positive()
                  .max(3 * 24 * 60),
              })
              .optional(),
            orderBy: z
              .enum([
                "cooking_time",
                "total_likes",
                "difficulty_level",
                "createdAt",
                "name",
              ])
              .optional(),
          })
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      console.log("************************");
      // if (input.cursor) {
      //   console.log(`Cursor: ${input.cursor}`);
      //   console.log(
      //     `Take: ${input.take ? input.take : Constants.DEFAULT_SELECT_NUMBER}`
      //   );
      // }
      // if (input.filters) {
      //   if (input.filters.categoryId) {
      //     console.log(`categoryId: ${input.filters.categoryId}`);
      //     // passingFilters["category"] = input.filters.categoryId;
      //   }
      //   if (input.filters.difficulty) {
      //     console.log(`Difficulty: ${input.filters.difficulty}`);
      //   }
      //   if (input.filters.orderBy) {
      //     console.log(`orderBy: ${input.filters.orderBy}`);
      //   }
      //   if (input.filters.timeToCook) {
      //     console.log(
      //       `timeToCook: ${input.filters.timeToCook.lower} - ${input.filters.timeToCook.higher}`
      //     );
      //   }
      // }
      console.log("************************");
      let orderBy = {};
      let whereConditions: (
        | { difficulty_level: DifficultyLevel }
        | { cooking_time_minutes: { lte: number } }
        | { cooking_time_minutes: { gte: number } }
        | { categories: { every: { category: { id: number } } } }
      )[] = [];
      // const mock = Array.from("1234567890|Z", (e) => {
      //   // console.log(e);
      //   return {
      //     categories: [
      //       { category: { name: "Vegetarian", id: 6 } },
      //       { category: { name: "Breakfast", id: 7 } },
      //       { category: { name: "BBQ", id: 8 } },
      //       { category: { name: "Vegan", id: 9 } },
      //     ],
      //     cooking_time_minutes: 60,
      //     createdAt: "Wed Feb 22 2023 17:16:04 GMT+0200",
      //     creator_id: "cldwtl3t60000uyjw3jdvykr9",
      //     description: "aaaaaaaaaa",
      //     difficulty_level: "medium",
      //     id: `${e}`,
      //     images: [
      //       {
      //         id: 1,
      //         recipe_id: "",
      //         url: "https://res.cloudinary.com/ddm9sjjq5/image/upload/v1677078943/let-me-cook/rfcfeghcxnoy6ldxmkam.png",
      //       },
      //     ] as RecipeImage[],
      //     name: `LetMeCook ${e}`,
      //     preparation_time: "21 hours",
      //     recipe_steps: "steps stepsstepsstepsstepsstepsstepssteps",
      //     total_likes: 0,
      //     user: {
      //       id: "cldwtl3t60000uyjw3jdvykr9",
      //       name: "Genadi Tsolov",
      //     },
      //     video_url: "No video",
      //   };
      // });
      //return mock;

      if (input.filters) {
        const result = getFiltersForQuery(input.filters);
        orderBy = result.orderBy;
        whereConditions = result.whereConditions;
      }

      if (input.cursor !== undefined) {
        // Cursor-based pagination
        return ctx.prisma.recipe.findMany({
          take:
            input.take !== undefined
              ? input.take
              : Constants.DEFAULT_SELECT_NUMBER,
          skip: 1,
          cursor: {
            id: input.cursor,
          },
          where: {
            AND: [{ is_deleted: false }, ...whereConditions],
          },
          orderBy: {
            ...(orderBy as
              | Prisma.Enumerable<Prisma.RecipeOrderByWithRelationInput>
              | undefined),
          },
          include: {
            user: {
              select: { name: true, id: true },
            },
            categories: {
              select: {
                category: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            images: true,
          },
        });
      } else {
        // offset pagination
        // const results = await ctx.prisma.recipe.findMany({
        //   skip: 3,
        //   take: 4,
        // });
        return ctx.prisma.recipe.findMany({
          take:
            input.take !== undefined
              ? input.take
              : Constants.DEFAULT_SELECT_NUMBER,
          where: {
            AND: [{ is_deleted: false }, ...whereConditions],
          },
          orderBy: {
            ...(orderBy as
              | Prisma.Enumerable<Prisma.RecipeOrderByWithRelationInput>
              | undefined),
          },
          include: {
            user: {
              select: { name: true, id: true },
            },
            categories: {
              select: {
                category: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            images: true,
          },
        });
      }
    }),

  likeRecipe: protectedProcedure
    .input(
      z.object({
        recipe_id: z.string(),
        // isLiked: z.boolean()
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user_id = ctx.session.user.id;
        const isLiked = await ctx.prisma.userPreferences.findFirst({
          select: {
            liked: true,
          },
          where: {
            AND: [
              { user_id: user_id },
              {
                recipe_id: input.recipe_id,
              },
            ],
          },
        });

        const { liked } = await ctx.prisma.userPreferences.upsert({
          where: {
            user_id_recipe_id: {
              user_id: user_id,
              recipe_id: input.recipe_id,
            },
          },
          update: {
            updatedAt: new Date(),
            liked: isLiked === null || isLiked.liked === false ? true : false,
          },
          create: {
            liked: true,
            recipe_id: input.recipe_id,
            user_id: user_id,
            made: false,
            saved: false,
          },
          select: {
            liked: true,
          },
        });
        return { success: true, liked };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  saveRecipe: protectedProcedure
    .input(
      z.object({
        recipe_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user_id = ctx.session.user.id;
        const isSaved = await ctx.prisma.userPreferences.findFirst({
          select: {
            saved: true,
          },
          where: {
            AND: [
              { user_id: user_id },
              {
                recipe_id: input.recipe_id,
              },
            ],
          },
        });

        const { saved } = await ctx.prisma.userPreferences.upsert({
          where: {
            user_id_recipe_id: {
              user_id: user_id,
              recipe_id: input.recipe_id,
            },
          },
          update: {
            updatedAt: new Date(),
            saved: isSaved === null || isSaved.saved === false ? true : false,
          },
          create: {
            saved: true,
            liked: false,
            recipe_id: input.recipe_id,
            user_id: user_id,
            made: false,
          },
          select: { saved: true },
        });
        return { success: true, saved };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  getUserPreferences: protectedProcedure
    .input(
      z.object({
        recipe_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const user_id = ctx.session.user.id;
        const userPreferences = await ctx.prisma.userPreferences.findUnique({
          where: {
            user_id_recipe_id: {
              recipe_id: input.recipe_id,
              user_id,
            },
          },
        });
        return { success: true, preferences: userPreferences };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  getCommentsForRecipe: publicProcedure
    .input(
      z.object({
        recipe_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const comments = await ctx.prisma.comment.findMany({
          where: {
            recipe_id: input.recipe_id,
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });
        return { success: true, comments };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),
});
