import { RecipeImage } from "@prisma/client";
import { z } from "zod";
import { RecipeSchema } from "../../../utils/createRecipeSchema";
import { ImageInfo, ImageInfoSchema } from "../../../utils/imageSchema";
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

      return ctx.prisma.recipe.create({
        data: {
          creator_id: ctx.session.user.id,
          name: input.name,
          preparation_time: `${input.preparationTime} ${input.preparationTimeUnit}`,
          description: input.description,
          difficulty_level: input.difficultyLevel,
          recipe_steps: input.recipe_steps,
          cooking_time_minutes: 60, //make function to calc
          video_url: input.video_url ? input.video_url : "No video",
          images: {
            createMany: {
              data: imageDataToSave,
              skipDuplicates: true,
            },
          },

          // categories: {
          //   createMany: {
          //     data: [
          //       // different categories
          //     ],
          //   },
          // },
        },
      });
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
        cursor: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // offset pagination

      // const results = await ctx.prisma.recipe.findMany({
      //   skip: 3,
      //   take: 4,
      // });

      // Cursor-based pagination
      return ctx.prisma.recipe.findMany({
        take: 10,
        skip: 1,
        cursor: {
          id: input.cursor,
        },
        where: {
          is_deleted: false,
        },
        orderBy: {
          id: "asc",
        },
      });
    }),
});
