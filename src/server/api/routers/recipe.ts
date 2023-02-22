import { RecipeImage } from "@prisma/client";
import { z } from "zod";
import { RecipeSchema } from "../../../utils/createRecipeSchema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const recipeRouter = createTRPCRouter({
  getRecipeByID: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.recipe.findUnique({
        where: {
          id: input.id,
        },
        include: {
          images: true,
          user: true,
          categories: true,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany({
      include: {
        images: true,
        user: true,
        categories: true,
      },
    });
  }),

  createRecipe: protectedProcedure
    .input(RecipeSchema)
    .mutation(({ ctx, input }) => {
      console.log(input);

      // return ctx.prisma.recipe.create({
      //   data: {
      //     name: input.name,
      //     creator_id: ctx.session.user.id,
      //     cooking_time_minutes: 60,
      //     recipe_steps: input.recipe_steps,
      //     description: input.description,
      //     video_url: input.video_url ? input.video_url : "",
      //     //       images: {
      //     //           createMany: {
      //     //               data: // Array.from({length: 5})
      //     //           // images data
      //     //           }
      //     //   },
      //     categories: {
      //       createMany: {
      //         data: [
      //           // different categories
      //         ],
      //       },
      //     },
      //   },
      // });
    }),

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
    .input(
      z.object({
        access_mode: z.string(),
        asset_id: z.string(),
        batchId: z.string(),
        bytes: z.number().positive(),
        created_at: z.string(),
        etag: z.string(),
        folder: z.string(),
        format: z.string(),
        height: z.number().positive(),
        id: z.string(),
        original_extension: z.string(),
        original_filename: z.string(),
        path: z.string(),
        placeholder: z.ostring().or(z.boolean()),
        public_id: z.string(),
        resource_type: z.string(),
        secure_url: z.string(),
        signature: z.string(),
        tags: z.string().array(),
        thumbnail_url: z.string(),
        type: z.string(),
        url: z.string(),
        version: z.number(),
        version_id: z.string(),
        width: z.number().positive(),
      })
    )

    .mutation(async ({ ctx, input }) => {
      console.log("******************2");
      console.log(input);

      const dataToSave = {
        // recipe_id: 1,
      };

      await ctx.prisma.recipeImage.create({
        data: {
          filename:
            input.public_id && input.folder
              ? (input.public_id.split(`${input.folder}/`).pop() as string)
              : input.public_id,
          createdAt: input.created_at,
          encoding: input.format,
          path: input.path,
          original_filename: input.original_filename,
          height: input.height,
          width: input.width,
          is_deleted: false,
          original_extension: input.original_extension
            ? input.original_extension
            : "png",
          size_in_bytes: input.bytes,
          url: input.secure_url,
          recipe_id: "",
        },
        skipDuplicates: true,
      });
    }),
});
