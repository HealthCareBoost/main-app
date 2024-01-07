import { z } from "zod";
// import { Prisma } from "@prisma/client";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { env } from "../../../env/server.mjs";
// import { MeasurementUnits } from "@prisma/client";

type NutrientData = {
  name: string;
  amount: number;
  unit: string;
};

export const ingredientsRouter = createTRPCRouter({
  /**
   * Adds a new ingredient to a recipe and saves it to the database.
   *
   * @function
   * @async
   * @name addIngredient
   *
   * @param {string} recipe_id - The ID of the recipe to which the ingredient will be added.
   * @param {string} ingredientName - The name of the new ingredient.
   * @param {string} measurement_unit - The measurement unit of the ingredient.
   * @param {number} quantity - The quantity of the ingredient.
   *
   * @returns {Promise<{ ingredient?: Ingredient }>} -
   *          A Promise that resolves with an object indicating the success status, along with
   *          the added ingredient if successful, or an error in case of failure.
   */
  addIngredient: publicProcedure
    .input(
      z.object({
        recipe_id: z.string(),
        ingredientName: z.string(),
        measurement_unit: z.string(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Check if the ingredient already exists in the database.
        const ingredient = await ctx.prisma.ingredients.findFirst({
          where: {
            name: input.ingredientName,
          },
        });

        if (!ingredient) {
          // If the ingredient doesn't exist in the database, fetch its nutrition information.
          const nutritions: Map<
            string,
            {
              amount: number;
              unit: string;
            }
          > | null = await getIngredientNutritions(input.ingredientName);

          // save to db
          if (nutritions !== null) {
            const nutritionsData: NutrientData[] = [];
            const keys = Array.from(nutritions.keys());

            keys.forEach((key) => {
              const mapItem = nutritions.get(key);
              if (mapItem !== undefined) {
                nutritionsData.push({
                  name: key,
                  amount: mapItem.amount,
                  unit: mapItem.unit,
                });
              }
            });

            const savedIngredient = await ctx.prisma.ingredients.create({
              data: {
                recipe_id: input.recipe_id,
                name: input.ingredientName,
                measurement_unit: input.measurement_unit,
                quantity: input.quantity,
                nutrition: { create: nutritionsData },
              },
            });
            return { success: true, ingredient: savedIngredient };
          }
        }
        return { success: true, ingredient };
      } catch (error) {
        return { success: false };
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.ingredients.findMany();
  }),

  /**
   * Retrieves all ingredients for a recipe
   *
   * @function
   * @name getAllForRecipeByID
   *
   * @param {string} recipe_id - The ID of the recipe
   *
   * @returns {Ingredient[]} - An array of ingredients associated with the specified recipe ID.
   */
  getAllForRecipeByID: publicProcedure
    .input(z.object({ recipe_id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.ingredients.findMany({
        where: {
          recipe_id: input.recipe_id,
        },
      });
    }),

  /**
   * Retrieves an ingredient based on its ID.
   *
   * @function
   * @name getIngredientByID
   *
   * @param {number} input.id - The ID of the ingredient to retrieve.
   *
   * @returns {Ingredient | null} - The retrieved ingredient or null if not found.
   */
  getIngredientByID: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.ingredients.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  /**
   * Retrieves nutrition information for an ingredient based on its ID.
   *
   * @function
   * @name getNutrition
   *
   * @param {number} ingredient_id - The ID of the ingredient
   * @returns {Nutrient[]} - An array of nutrition information about the ingredient
   */
  getNutrintion: publicProcedure
    .input(z.object({ ingredient_id: z.number().positive() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.nutrients.findMany({
        where: {
          ingredient_id: input.ingredient_id,
        },
      });
    }),
});

export const getIngredientNutritions: (
  ingredientName: string
) => Promise<Map<string, { amount: number; unit: string }> | null> = async (
  ingredientName
) => {
  const options = {
    method: "GET",
    url: `${env.FOOD_API_URL}/food/ingredients/search`,
    params: {
      query: ingredientName,
    },
    headers: {
      "X-RapidAPI-Key": env.FOOD_API_KEY,
      "X-RapidAPI-Host": env.FOOD_API_HOST,
    },
  };

  try {
    const responce: AxiosResponse<{
      results: IngredientResponce[];
      offset: number;
      number: number;
      totalResults: number;
    }> = await axios.request(options);
    const fetchedIngredients = responce.data.results;
    // console.log(fetchedIngredients);
    const ingredient = fetchedIngredients.find(
      (item) => item.name === ingredientName
    );

    if (ingredient && ingredient !== undefined) {
      const res: AxiosResponse<IngridientDetailsResponce> = await axios.request(
        {
          method: "GET",
          url: `${env.FOOD_API_URL}/food/ingredients/${ingredient.id}/information`,
          params: { amount: "100", unit: "grams" },
          headers: {
            "X-RapidAPI-Key": env.FOOD_API_KEY,
            "X-RapidAPI-Host": env.FOOD_API_HOST,
          },
        }
      );
      // console.log("2222222222222222222222");
      // console.log(res.data);

      const ingridientDetails = res.data;
      // console.log(ingridientDetails);

      const nutrientsMap = new Map<string, { amount: number; unit: string }>();
      ingridientDetails.nutrition.nutrients.filter((item) => {
        if (
          item.name === "Protein" ||
          item.name === "Calories" ||
          item.name === "Carbohydrates" ||
          item.name === "Fat" ||
          item.name === "Sugar"
        ) {
          nutrientsMap.set(item.name, { amount: item.amount, unit: item.unit });
        }
      });
      console.log(nutrientsMap);
      return nutrientsMap;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getIngredientNutritionsCollection: (
  ingredientName: string
) => Promise<NutrientData[] | null> = async (ingredientName) => {
  const options = {
    method: "GET",
    url: `${env.FOOD_API_URL}/food/ingredients/search`,
    params: {
      query: ingredientName,
    },
    headers: {
      "X-RapidAPI-Key": env.FOOD_API_KEY,
      "X-RapidAPI-Host": env.FOOD_API_HOST,
    },
  };

  try {
    const responce: AxiosResponse<{
      results: IngredientResponce[];
      offset: number;
      number: number;
      totalResults: number;
    }> = await axios.request(options);
    const fetchedIngredients = responce.data.results;
    // console.log(fetchedIngredients);
    const ingredient = fetchedIngredients.find(
      (item) => item.name === ingredientName
    );

    if (ingredient && ingredient !== undefined) {
      const res: AxiosResponse<IngridientDetailsResponce> = await axios.request(
        {
          method: "GET",
          url: `${env.FOOD_API_URL}/food/ingredients/${ingredient.id}/information`,
          params: { amount: "100", unit: "grams" },
          headers: {
            "X-RapidAPI-Key": env.FOOD_API_KEY,
            "X-RapidAPI-Host": env.FOOD_API_HOST,
          },
        }
      );
      // console.log("2222222222222222222222");
      // console.log(res.data);

      const ingridientDetails = res.data;
      // console.log(ingridientDetails);

      const nutrientsMap: NutrientData[] = [];
      ingridientDetails.nutrition.nutrients.filter((item) => {
        if (
          item.name === "Protein" ||
          item.name === "Calories" ||
          item.name === "Carbohydrates" ||
          item.name === "Fat" ||
          item.name === "Sugar"
        ) {
          nutrientsMap.push({
            name: item.name,
            amount: item.amount,
            unit: item.unit,
          });
        }
      });
      console.log(nutrientsMap);
      return nutrientsMap;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

type IngredientResponce = {
  id: number;
  name: string;
  image: string;
};

type IngridientDetailsResponce = {
  id: number;
  original: string;
  originalName: string;
  name: string;
  amount: number;
  unit: string;
  unitShort: string;
  unitLong: string;
  possibleUnits: string[];
  estimatedCost: object;
  consistency: string;
  shoppingListUnits: string[];
  aisle: string;
  image: string;
  meta: [];
  nutrition: {
    nutrients: [
      {
        name: string;
        amount: number;
        unit: string;
        percentOfDailyNeeds: number;
      }
    ];
    properties: [];
    flavonoids: [
      {
        name: string;
        amount: number;
        unit: string;
      }
    ];
    caloricBreakdown: {
      percentProtein: number;
      percentFat: number;
      percentCarbs: number;
    };
    weightPerServing: {
      amount: number;
      unit: string;
    };
  };
  categoryPath: string[];
};
