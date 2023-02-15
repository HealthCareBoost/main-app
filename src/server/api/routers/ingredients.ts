import { z } from "zod";
// import { Prisma } from "@prisma/client";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import axios from "axios";
import { env } from "../../../env/server.mjs";

export const ingredientsRouter = createTRPCRouter({
  addIngredient: publicProcedure
    .input(z.object({ ingredientName: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const ingredient = await ctx.prisma.ingredients.findFirst({
          where: {
            name: input.ingredientName,
          },
        });
        console.log(input.ingredientName);
        if (!ingredient) {
          //make api req to get nutritions
          const nutritions: Map<
            string,
            {
              amount: number;
              unit: string;
            }
          > | null = await getIngredientNutritions(input.ingredientName);
          //save to db
          if (nutritions !== null) {
            const savedIngredient = await ctx.prisma.ingredients.create({
              data: {
                name: input.ingredientName,
                nutrition: {
                  create: [
                    // !!!! refactor !!!!
                    {
                      name: "Protein",
                      amount: nutritions.get("Protein")
                        ? nutritions.get("Protein")!.amount
                        : 0,
                      unit: nutritions.get("Protein")
                        ? nutritions.get("Protein")!.unit
                        : "g",
                    },
                    {
                      name: "Calories",
                      amount: nutritions.get("Calories")
                        ? nutritions.get("Calories")!.amount
                        : 0,
                      unit: nutritions.get("Calories")
                        ? nutritions.get("Calories")!.unit
                        : "g",
                    },
                    {
                      name: "Carbohydrates",
                      amount: nutritions.get("Carbohydrates")
                        ? nutritions.get("Carbohydrates")!.amount
                        : 0,
                      unit: nutritions.get("Carbohydrates")
                        ? nutritions.get("Carbohydrates")!.unit
                        : "g",
                    },
                    {
                      name: "Fat",
                      amount: nutritions.get("Fat")
                        ? nutritions.get("Fat")!.amount
                        : 0,
                      unit: nutritions.get("Fat")
                        ? nutritions.get("Fat")!.unit
                        : "g",
                    },
                    {
                      name: "Sugar",
                      amount: nutritions.get("Sugar")
                        ? nutritions.get("Sugar")!.amount
                        : 0,
                      unit: nutritions.get("Sugar")
                        ? nutritions.get("Sugar")!.unit
                        : "g",
                    },
                  ],
                },
              },
            });
            return { success: true, savedIngredient };
          }
        }
        return { success: true, ingredient };
        // is it error if exists ???
        // else throw new Error("Ingredient is already saved in the database.");
      } catch (error) {
        // if (error instanceof Prisma.PrismaClientRustPanicError) {}
        return { success: false };
      }
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.ingredients.findMany();
  }),

  getAllForRecipeByID: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipeIngredient.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

const getIngredientNutritions: (
  ingredientName: string
) => Promise<Map<string, { amount: number; unit: string }> | null> = async (
  ingredientName
) => {
  const options = {
    method: "GET",
    url: `${env.FOOD_API_URL}search`,
    params: {
      query: ingredientName,
    },
    headers: {
      "X-RapidAPI-Key": env.FOOD_API_KEY,
      "X-RapidAPI-Host": env.FOOD_API_HOST,
    },
  };

  try {
    const responce = await axios.request(options);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const fetchedIngredients = responce.data.results as IngredientResponce[];
    // console.log(fetchedIngredients);
    const ingredient = fetchedIngredients.find(
      (item) => item.name === ingredientName
    );

    if (ingredient && ingredient !== undefined) {
      const res = await axios.request({
        method: "GET",
        url: `${env.FOOD_API_URL}${ingredient.id}/information`,
        params: { amount: "100", unit: "grams" },
        headers: {
          "X-RapidAPI-Key": env.FOOD_API_KEY,
          "X-RapidAPI-Host": env.FOOD_API_HOST,
        },
      });
      // console.log("2222222222222222222222");
      // console.log(res.data);

      const ingridientDetails = res.data as IngridientDetailsResponce;
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
