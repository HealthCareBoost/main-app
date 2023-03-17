import { DifficultyLevel, Prisma } from "@prisma/client";
import type { RecipeImage } from "@prisma/client";
import { z } from "zod";
import { Constants } from "../../../utils/constants";
import { RecipeSchema } from "../../../utils/createRecipeSchema";
import { ImageInfoSchema } from "../../../utils/imageSchema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { getFiltersForQuery } from "../../../utils/mapFilters";

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
      if (input.cursor) {
        console.log(`Cursor: ${input.cursor}`);
        console.log(
          `Take: ${input.take ? input.take : Constants.DEFAULT_SELECT_NUMBER}`
        );
      }
      if (input.filters) {
        if (input.filters.categoryId) {
          console.log(`categoryId: ${input.filters.categoryId}`);
          // passingFilters["category"] = input.filters.categoryId;
        }
        if (input.filters.difficulty) {
          console.log(`Difficulty: ${input.filters.difficulty}`);
        }
        if (input.filters.orderBy) {
          console.log(`orderBy: ${input.filters.orderBy}`);
        }
        if (input.filters.timeToCook) {
          console.log(
            `timeToCook: ${input.filters.timeToCook.lower} - ${input.filters.timeToCook.higher}`
          );
        }
      }
      console.log("************************");
      const { orderBy, whereConditions } = getFiltersForQuery(input.filters);
      console.log(orderBy);
      console.log(whereConditions);

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
});
