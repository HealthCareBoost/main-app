import { createCallerFactory, createTRPCRouter } from "./trpc";
import { dietRouter } from "./routers/diet";
import { ingredientsRouter } from "./routers/ingredients";
import { recipeRouter } from "./routers/recipe";
import { categoryRouter } from "./routers/categories";
import { userRouter } from "./routers/user";
import { chatRouter } from "./routers/ai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  diet: dietRouter,
  ingredients: ingredientsRouter,
  recipe: recipeRouter,
  category: categoryRouter,
  user: userRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
