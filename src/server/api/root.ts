import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { ingredientsRouter } from "./routers/ingredients";
import { recipeRouter } from "./routers/recipe";
import { categoryRouter } from "./routers/categories";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  ingredients: ingredientsRouter,
  recipe: recipeRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
