import { DifficultyLevel } from "@prisma/client";
import type { RecipeImage, Prisma } from "@prisma/client";
import { nullable, number, z } from "zod";
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
          total_time_minutes: timeToMinutes(
            input.preparationHours + input.cookingHours,
            input.preparationMinutes + input.cookingMinutes
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

      await ctx.prisma.$transaction(async (prisma) => {
        for (const ingredient of recipe.ingredients) {
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
        }
      });

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
              recipe_data.cookingMinutes
            ),
            preparation_time_minutes: timeToMinutes(
              recipe_data.preparationHours,
              recipe_data.preparationMinutes
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
              (i: NewIngredient) => i.name === ingredient.name
            );

            console.log(`${ingredient.name} ${isNew ? "new" : "not"}`);
            if (isNew) {
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
          })
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      console.log("************************");
      console.log(input);
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
      let whereConditions: WhereConditionsType = [];

      if (input.filters) {
        const result = getFiltersForQuery(input.filters);
        orderBy = result.orderBy;
        whereConditions = result.whereConditions;
      }

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

      let nextCursor: string | undefined = undefined;
      if (recipes.length > input.take) {
        // return the last item from the array
        const nextItem = recipes.pop();
        nextCursor = nextItem?.id;
      }

      return { recipes, nextCursor };
    }),

  likeRecipe: protectedProcedure
    .input(
      z.object({
        recipe_id: z.string(),
        // isLiked: z.boolean(),
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

        const [{ liked }, recipeData] = await ctx.prisma.$transaction([
          updateUserLikes,
          updateRecipeTotalLikes,
        ]);

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

  getUserPreferences: publicProcedure
    .input(
      z.object({
        recipe_id: z.string(),
      })
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

  getRecipesRecomended: publicProcedure
    .input(
      z.object({
        user_id: z.string().min(1),
      })
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

  searchRecipeByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.recipe.findMany({
        where: {
          name: {
            contains: input.name,
          },
        },
        take: Constants.MAX_SEARCH,
      });
    }),

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
      })
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
  // type a = { name: string; amount: number; unit: string };

  getNutrition: publicProcedure
    .input(
      z.object({
        recipe_id: z.string(),
      })
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

        console.log("*********** ingr *******************");
        console.log(ingredients);
        console.log("*********** ingr *******************");

        const map = new Map<string, number>([]);
        if (ingredients && ingredients.length > 0) {
          ingredients.forEach((ingr, idx) => {
            console.log(
              `------------------ ingr nutr ${idx} ------------------`
            );
            console.log(ingr.nutrition);
            console.log(
              `------------------ ingr nutr ${idx}  ------------------`
            );

            if (ingr.nutrition && ingr.nutrition.length > 0) {
              ingr.nutrition.forEach((nutr) => {
                console.log(`*********** nutr *******************`);
                console.log(nutr);
                console.log(`*********** nutr *******************`);

                const val = map.get(nutr.name);
                console.log(`*********** val *******************`);
                console.log(val);
                console.log(`*********** val  *******************`);
                if (val) {
                  map.set(nutr.name, val + nutr.amount);
                } else {
                  map.set(nutr.name, nutr.amount);
                }
              });
            }
          });
        }

        console.log(map);
        return { nutrition: map.entries(), success: true };
      } catch (error) {
        console.error(error);
        return { error, success: false };
      }
    }),
});
