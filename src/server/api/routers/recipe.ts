import { DifficultyLevel } from "@prisma/client";
import type { RecipeImage, Prisma } from "@prisma/client";
import { z } from "zod";
import { Constants } from "../../../utils/constants";
import { RecipeSchema } from "../../../utils/validations/createRecipeSchema";
import { ImageInfoSchema } from "../../../utils/validations/imageSchema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import type { WhereConditionsType } from "../../../utils/mapFilters";
import { getFiltersForQuery } from "../../../utils/mapFilters";
import { timeToMinutes } from "../../../utils/timeConverter";
import { getIngredientNutritionsCollection } from "./ingredients";
import type {
  IngredientToUpdate,
  NewIngredient,
} from "../../../utils/recipe/recipeTypes";
import { RecipeImageMapper } from "@/utils/recipe/recipeMapper";

export const recipeRouter = createTRPCRouter({
  /**
   * Retrieves a recipe with a specific ID from the database.
   *
   * @function
   * @async
   * @name getRecipeByID
   *
   * @param {string} id - The ID of the recipe to retrieve.
   *
   * @returns {Promise<Recipe>}  A Promise that resolves with the recipe object
   *                              that matches the specified ID.
   */
  getRecipeByID: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        if (!input.id) {
          throw new Error("No recipe ID provided");
        }

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
   * @returns {Promise<Recipe[]>}  A Promise that resolves with an array of
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
   * @returns {Promise<Recipe>}  A Promise that resolves with the newly created recipe object.
   *
   */
  createRecipe: protectedProcedure
    .input(RecipeSchema)
    .mutation(async ({ ctx, input }) => {
      // map images data to the fotm to be saved
      const imageDataToSave = RecipeImageMapper(input.images);

      const ingredientsData = [];
      for (const ingredient of input.ingredients) {
        ingredientsData.push({
          quantity: ingredient.quantity,
          measurement_unit: ingredient.measurement_unit,
          name: ingredient.ingredient_name,
        });
      }

      const recipe = await ctx.prisma.recipe.create({
        data: {
          creator_id: ctx.session.user.id,
          name: input.name,
          cooking_time_minutes: timeToMinutes(
            input.cookingHours,
            input.cookingMinutes,
          ),
          preparation_time_minutes: timeToMinutes(
            input.preparationHours,
            input.preparationMinutes,
          ),
          total_time_minutes: timeToMinutes(
            input.preparationHours + input.cookingHours,
            input.preparationMinutes + input.cookingMinutes,
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

      // Get all the nutrition values of the all ingredients
      for (const ingredient of recipe.ingredients) {
        const nutritionData = await getIngredientNutritionsCollection(
          ingredient.name,
        );

        if (nutritionData) {
          await ctx.prisma.$transaction(
            async (prisma) => {
              const ingredientNutritionData = nutritionData.map((nutrient) => ({
                ...nutrient,
                ingredient_id: ingredient.id,
              }));

              await prisma.nutrients.createMany({
                data: [...ingredientNutritionData],
              });
            },
            { timeout: 10000 },
          );
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
   * @returns {Promise<object>}  A Promise that resolves with the updated recipe object.
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

  update: protectedProcedure
    .input(z.object({ recipe_id: z.string(), recipe_data: RecipeSchema }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { recipe_data, recipe_id } = input;

        // const currentRecipeData = await ctx.prisma.recipe.findUniqueOrThrow({
        //   where: { id: recipe_id },
        //   include: {
        //     ingredients: true,
        //     categories: true,
        //     images: true,
        //   },
        // });

        const ingredientsToUpdate: IngredientToUpdate[] = [];
        const newIngrediensAdded: NewIngredient[] = [];

        console.log("reipe ingr form");
        console.log(recipe_data.ingredients);

        for (const ingredient of recipe_data.ingredients) {
          const foundIngredient = await ctx.prisma.ingredients.findFirst({
            where: {
              AND: [
                {
                  name: ingredient.ingredient_name,
                },
                {
                  recipe_id,
                },
              ],
            },
          });

          console.log(foundIngredient);

          if (!foundIngredient) {
            newIngrediensAdded.push({
              quantity: ingredient.quantity,
              measurement_unit: ingredient.measurement_unit,
              name: ingredient.ingredient_name,
            });
          }

          if (foundIngredient) {
            const isChanged =
              ingredient.ingredient_name !== foundIngredient.name ||
              foundIngredient.quantity !== ingredient.quantity ||
              foundIngredient.measurement_unit !== ingredient.measurement_unit;

            if (isChanged) {
              ingredientsToUpdate.push({
                id: foundIngredient.id,
                quantity: ingredient.quantity,
                measurement_unit: ingredient.measurement_unit,
                name: ingredient.ingredient_name,
              });
            }
          }
        }

        console.log("ingredientsToUpdate");
        console.log(ingredientsToUpdate);
        await ctx.prisma.$transaction(async (prisma) => {
          for (const object of ingredientsToUpdate) {
            await prisma.ingredients.update({
              where: {
                id: object.id,
              },
              data: {
                name: object.name,
                measurement_unit: object.measurement_unit,
                quantity: object.quantity,
              },
            });
          }
        });

        const updateRecipe = await ctx.prisma.recipe.update({
          where: {
            id: recipe_id,
          },
          data: {
            name: recipe_data.name,
            cooking_time_minutes: timeToMinutes(
              recipe_data.cookingHours,
              recipe_data.cookingMinutes,
            ),
            preparation_time_minutes: timeToMinutes(
              recipe_data.preparationHours,
              recipe_data.preparationMinutes,
            ),
            description: recipe_data.description,
            difficulty_level: recipe_data.difficultyLevel,
            recipe_steps: recipe_data.recipe_steps,
            ingredients: {
              create: newIngrediensAdded,
            },
          },
          include: { ingredients: true },
        });

        console.log("updateRecipe");
        console.log(updateRecipe);
        await ctx.prisma.$transaction(async (prisma) => {
          for (const ingredient of updateRecipe.ingredients) {
            const isNew = !!newIngrediensAdded.find(
              (i: NewIngredient) => i.name === ingredient.name,
            );

            console.log(`${ingredient.name} ${isNew ? "new" : "not"}`);
            if (isNew) {
              const nutritionData = await getIngredientNutritionsCollection(
                ingredient.name,
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
            }
          }
        });
        return { success: true, recipe: updateRecipe };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
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

  /**
   * Retrieves a paginated list of recipes based on specified filters and pagination parameters
   *
   * @param {string|null} cursor - The cursor indicating the starting point for pagination.
   * @param {number} take - The number of recipes to retrieve in a single request.
   * @param {object} filters - Additional filters for refining the recipe selection.
   * @param {number|null} filters.categoryId - The ID of the category to filter recipes.
   * @param {DifficultyLevel|null} filters.difficulty - The difficulty level to filter recipes.
   * @param {object|null} filters.timeToCook - The time range to filter recipes based on cooking time.
   * @param {number|null} filters.timeToCook.lower - The lower limit of cooking time.
   * @param {number|null} filters.timeToCook.higher - The upper limit of cooking time.
   * @param {OrderBy|null} filters.orderBy - The field by which the recipes should be ordered.
   * @param {string|null} filters.searched_recipe - The name of the recipe to search for.
   *
   * @returns {Promise<{ recipes: Recipe[], nextCursor: string|undefined }>} - The paginated list of recipes and the next cursor.
   * @throws Will throw an error if there are issues with the database query.
   */
  getPaginatedRecipes: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        take: z
          .number()
          .positive()
          .min(1)
          .max(Constants.MAX_SELECT_NUMBER)
          .default(Constants.DEFAULT_SELECT_NUMBER),
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
            searched_recipe: z.string().optional(),
          })
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let orderBy = {};
      let whereConditions: WhereConditionsType = [];

      // if there are filter pass the to the helper function,
      // that returns them in object with correct structure for the db query
      if (input.filters) {
        const result = getFiltersForQuery(input.filters);
        orderBy = result.orderBy;
        whereConditions = result.whereConditions;
      }

      // if there are user preferences create an object with them to pass to the query
      let preferencesOptions = {};
      if (ctx.session && ctx.session.user) {
        preferencesOptions = {
          user_preferences: {
            where: {
              // ...(ctx.session.user.id ? { user_id: ctx.session.user.id } : {}),
              user_id: ctx.session.user.id,
            },
            select: { liked: true },
            take: 1,
          },
        };
      }

      const recipes = await ctx.prisma.recipe.findMany({
        take: input.take + 1,
        // skip: 1,
        cursor: input.cursor
          ? {
              id: input.cursor,
            }
          : undefined,
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
          ...preferencesOptions,
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

      // Get the cursor for the next query
      let nextCursor: string | undefined = undefined;
      if (recipes.length > input.take) {
        // return the last item from the array
        const nextItem = recipes.pop();
        nextCursor = nextItem?.id;
      }

      return { recipes, nextCursor };
    }),

  /**
   * Handles the user's liking or unliking of a recipe and updating the recipe's total likes
   *
   * @function
   * @async
   * @name likeRecipe
   *
   * @param {string} recipe_id - The ID of the recipe
   * @returns {Promise<{ liked?: boolean }>}
   *  A Promise that resolves with the success status, whether the recipe is liked, and an optional error.
   */
  likeRecipe: protectedProcedure
    .input(
      z.object({
        recipe_id: z.string(),
        // isLiked: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user_id = ctx.session.user.id;
        // Check if the user was liked the recipe already
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

        // Update user preferences if the recipe was Liked (isLiked !== null)
        //  Or Like the recipe and save it to the db
        const updateUserLikes = ctx.prisma.userPreferences.upsert({
          where: {
            user_id_recipe_id: {
              user_id: user_id,
              recipe_id: input.recipe_id,
            },
          },
          update: {
            liked: isLiked === null || isLiked.liked === false ? true : false,
          },
          create: {
            user_id: user_id,
            recipe_id: input.recipe_id,
            liked: true,
            made: false,
            saved: false,
          },
          select: {
            liked: true,
          },
        });

        // Update recipe total likes
        const updateRecipeTotalLikes = ctx.prisma.recipe.update({
          data: {
            total_likes: {
              increment: isLiked === null || isLiked.liked === false ? 1 : -1,
            },
          },
          where: {
            id: input.recipe_id,
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [{ liked }, _recipeData] = await ctx.prisma.$transaction([
          updateUserLikes,
          updateRecipeTotalLikes,
        ]);

        return { success: true, liked };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    }),

  /**
   * Handles the user's saveing or unsaving of a recipe and updating the user's preferences
   *
   * @function
   * @async
   * @name saveRecipe
   *
   * @param {string} recipe_id - The ID of the recipe
   * @returns {Promise<{ success: boolean, saved?: boolean, error?: any }>}
   * A Promise that resolves with the success status, whether the recipe is saved, and an optional error.
   */
  saveRecipe: protectedProcedure
    .input(
      z.object({
        recipe_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if the user has already saved the recipe
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

        // Update user preferences if the recipe was saved (isSaved !== null)
        //  Or Like the recipe and save it to the db
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

  /**
   * Retrieves user preferences for a specific recipe.
   *
   * @function
   * @async
   * @name getUserPreferences
   *
   * @param {string} recipe_id - The ID of the recipe
   * @returns {Promise<{ preferences?: UserPreferences }>}
   * A Promise that resolves with user's preferences (saved, liked, made) for a recipe
   * if they are available
   */
  getUserPreferences: publicProcedure
    .input(
      z.object({
        recipe_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        if (!ctx.session) {
          return { success: false };
        }

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

  /**
   * Retrieves comments for a specific recipe.
   *
   * @function
   * @async
   * @name getCommentsForRecipe
   *
   * @param {string} recipe_id - The ID of the recipe
   * @param {number} take - Number of the latest comments to take
   * @returns {Promise<{ comments?: Comment[] }>} A Promise that resolves with the latest comments or empty array
   */
  getCommentsForRecipe: publicProcedure
    .input(
      z.object({
        recipe_id: z.string(),
        take: z
          .number()
          .positive()
          .optional()
          .default(Constants.COMMENTS_SELECT_NUMBER),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const comments = await ctx.prisma.comment.findMany({
          take: input.take,
          where: {
            recipe_id: input.recipe_id,
          },
          orderBy: {
            createdAt: "desc",
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

  /**
   * Retrieves recommended recipes based on user preferences (liked or saved).
   *
   * @function
   * @name getRecipesRecomended
   *
   * @param {string} user_id - The ID of the user.
   * @returns {Promise<Recipe[]>} - A Promise that resolves with the retrieved recommended recipes.
   */
  getRecipesRecomended: publicProcedure
    .input(
      z.object({
        user_id: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const recipe_ids = await ctx.prisma.userPreferences.findMany({
        select: {
          recipe_id: true,
        },
        where: {
          AND: [
            {
              user_id: input.user_id,
            },
            { OR: [{ liked: true }, { saved: true }] },
          ],
        },
        take: Constants.DEFAULT_SELECT_NUMBER,
        orderBy: {
          createdAt: "desc",
        },
      });

      // Create an array of recipe ids and fetch the information for them from the db
      const arr = recipe_ids.map((el) => el.recipe_id);

      return ctx.prisma.recipe.findMany({
        take: Constants.DEFAULT_SELECT_NUMBER,
        where: {
          id: {
            in: arr,
          },
        },
        include: {
          user: {
            select: { name: true, id: true },
          },
          images: true,
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
        },
      });
    }),

  /**
   * Searches recipes by given string
   *
   * @function
   * @name searchRecipeByName
   *
   * @param {string} name - The part of the name to be used for searching recipes
   * @returns {Promise<{ recipes?: Recipe[], error?: any }>}
   * A Promise that resolves with the recipes tha match the name if there are any
   */
  searchRecipeByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      try {
        if (!input.name || input.name.length <= 1) {
          return [];
        }
        return ctx.prisma.recipe.findMany({
          where: {
            name: {
              contains: input.name,
            },
          },
          take: Constants.MAX_SEARCH,
        });
      } catch (error) {
        console.error(error);
        return [];
      }
    }),

  /**
   * Retrieves recipes based on user interactions.
   *
   * @function
   * @name getInteractedRecipes
   *
   * @param {string} user_id - The ID of the user
   * @param {string | null} cursor - The cursor for pagination
   * @param {number} take - The number of recipes to retrieve
   * @param {object} filters - Object with all filters for user preferences
   * @param {boolean} filters.saved - Filter for saved recipes
   * @param {boolean} filters.liked - Filter for liked recipes
   * @param {boolean} filters.made - Filter for made recipes
   *
   * @returns {Promise<{ recipes: Recipe[], nextCursor?: string }>}
   * A Promise that resolves with the retrieved recipes and an optional next cursor.
   */
  getInteractedRecipes: publicProcedure
    .input(
      z.object({
        user_id: z.string().min(1),
        cursor: z.string().nullish(),
        take: z
          .number()
          .positive()
          .min(1)
          .max(Constants.MAX_SELECT_NUMBER)
          .default(Constants.DEFAULT_SELECT_NUMBER),
        filters: z
          .object({
            saved: z.boolean().default(false).optional(),
            liked: z.boolean().default(false).optional(),
            made: z.boolean().default(false).optional(),
            // categoryId: z.number().positive().optional(),
            // difficulty: z.nativeEnum(DifficultyLevel).optional(),
            // timeToCook: z
            //   .object({
            //     lower: z.number().min(0),
            //     higher: z
            //       .number()
            //       .positive()
            //       .max(3 * 24 * 60),
            //   })
            //   .optional(),
            // orderBy: z
            //   .enum([
            //     "cooking_time",
            //     "total_likes",
            //     "difficulty_level",
            //     "createdAt",
            //     "name",
            //   ])
            //   .optional(),
          })
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const preferences: (
        | {
            liked: boolean;
          }
        | {
            made: boolean;
          }
        | {
            saved: boolean;
          }
      )[] = [];

      // Get all filters for the query
      if (input.filters) {
        if (input.filters.liked) {
          preferences.push({ liked: true });
        }
        if (input.filters.made) {
          preferences.push({ made: true });
        }
        if (input.filters.saved) {
          preferences.push({ saved: true });
        }
      }

      const recipe_ids = await ctx.prisma.userPreferences.findMany({
        take: input.take + 1,
        cursor: input.cursor
          ? {
              user_id_recipe_id: {
                recipe_id: input.cursor,
                user_id: input.user_id,
              },
            }
          : undefined,
        select: {
          recipe_id: true,
        },
        where: {
          AND: [
            {
              user_id: input.user_id,
            },
            { OR: [...preferences] },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      // Create an array of recipe ids and fetch the information for them from the db
      const arr = recipe_ids.map((el) => el.recipe_id);
      const recipes = await ctx.prisma.recipe.findMany({
        take: Constants.DEFAULT_SELECT_NUMBER,
        where: {
          id: {
            in: arr,
          },
        },
        include: {
          user: {
            select: { name: true, id: true },
          },
          images: true,
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
        },
      });

      let nextCursor: string | undefined = undefined;
      if (recipes.length > input.take) {
        // return the last item from the array
        const nextItem = recipes.pop();
        nextCursor = nextItem?.id;
      }

      return { recipes, nextCursor };
    }),

  /**
   * Retrieves aggregated nutrition information for a recipe based on its ID.
   *
   * @function
   * @async
   * @name getNutrition
   *
   * @param {string} recipe_id - The ID of the recipe for which to retrieve nutrition information.
   * @returns {Promise<Map<string, { amount: number, unit: string }>>}  Returns a Promise that
   *  resolves with an object containing aggregated nutrition information as a Map
   */
  getNutrition: publicProcedure
    .input(
      z.object({
        recipe_id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      try {
        const { ingredients } = await ctx.prisma.recipe.findUniqueOrThrow({
          where: {
            id: input.recipe_id,
          },
          select: {
            ingredients: {
              select: {
                nutrition: true,
              },
            },
          },
        });

        const map = new Map<string, { amount: number; unit: string }>([]);

        if (!ingredients || ingredients.length === 0) {
          return { nutrition: map, success: true };
        }

        // for each ingredient check all of its nutrients
        // and get their stats into a Map
        ingredients.forEach((ingr) => {
          if (ingr.nutrition && ingr.nutrition.length > 0) {
            ingr.nutrition.forEach((nutrient) => {
              const existingNutrient = map.get(nutrient.name);

              if (existingNutrient) {
                map.set(nutrient.name, {
                  amount: existingNutrient.amount + nutrient.amount,
                  unit: nutrient.unit,
                });
              } else {
                map.set(nutrient.name, {
                  amount: nutrient.amount,
                  unit: nutrient.unit,
                });
              }
            });
          }
        });
        return { nutrition: map, success: true };
      } catch (error) {
        console.error(error);
        return { error, success: false };
      }
    }),

  /**
   * Retrieves recipe recommendations based on a list of product names.
   *
   * @function
   * @async
   * @name getRecomendationBasedOnProducts
   *
   * @param {string[]} product_names - An array of product names to base recommendations on.
   *
   * @returns {Promise<Recipe[]>}  A Promise that resolves with an array of recommended recipes.
   */
  getRecomendationBasedOnProducts: publicProcedure
    .input(
      z.object({
        product_names: z.string().array(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        if (input.product_names.length < 1) {
          return [];
        }

        const allProducts = input.product_names.map((name) => ({
          name: { contains: name },
        }));

        const recommendations = await ctx.prisma.recipe.findMany({
          where: {
            ingredients: {
              some: {
                AND: [...allProducts],
              },
            },
          },
          take: Constants.MAX_SEARCH,
        });

        return { recommendations };
      } catch (error) {
        console.error(error);
        return [];
      }
    }),

  /**
   * Retrieves list of recipes based on creation date.
   *
   * @function
   * @async
   * @name getLatest
   *
   * @param {number} take - The number of recipes to retrieve
   *
   * @returns {Promise<Recipe[]>}  A Promise that resolves with an array of recipes.
   */
  getLatest: publicProcedure
    .input(
      z.object({
        take: z.number().positive().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        return ctx.prisma.recipe.findMany({
          take: input.take ?? Constants.MAX_SEARCH,
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (error) {
        console.error(error);
        return [];
      }
    }),

  /**
   * Retrieves list of recipes based on creation date.
   *
   * @function
   * @async
   * @name getRecipeOwner
   * @param {string} recipe_id - The ID of the recipe to get the owner of
   *
   * @returns {Promise<User>}  A Promise that resolves with the user that owns the recipe.
   */
  getRecipeOwner: publicProcedure
    .input(
      z.object({
        recipe_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        return ctx.prisma.recipe.findUniqueOrThrow({
          where: {
            id: input.recipe_id,
          },
          select: {
            user: true,
          },
        });
      } catch (error) {
        console.error(error);
        return null;
      }
    }),
});
