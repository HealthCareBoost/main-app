import type { DifficultyLevel } from "@prisma/client";

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export const getFiltersForQuery: (
  filters:
    | {
        categoryId?: number | undefined;
        difficulty?: DifficultyLevel | undefined;
        timeToCook?:
          | {
              higher: number;
              lower: number;
            }
          | undefined;
        orderBy?:
          | "cooking_time"
          | "total_likes"
          | "difficulty_level"
          | "createdAt"
          | "name"
          | undefined;
      }
    | undefined
) => {
  orderBy: AtLeastOne<{
    id?: string;
    difficulty_level?: string;
    total_likes?: string;
    createdAt?: string;
    name?: string;
    cooking_time_minutes?: string;
  }>;
  whereConditions: (
    | {
        difficulty_level: DifficultyLevel;
      }
    | {
        cooking_time_minutes: {
          lte: number;
        };
      }
    | {
        cooking_time_minutes: {
          gte: number;
        };
      }
    | {
        categories: { every: { category: { id: number } } };
      }
  )[];
} = (filters) => {
  const orderBy: {
    id?: string;
    difficulty_level?: string;
    total_likes?: string;
    createdAt?: string;
    name?: string;
    cooking_time_minutes?: string;
  } = {};

  const whereConditions = [];
  // console.log(filters);

  if (filters === undefined)
    return {
      orderBy: { ...orderBy, id: "asc" },
      whereConditions: [],
    };

  if (filters.orderBy !== undefined) {
    switch (filters.orderBy) {
      case "difficulty_level": {
        orderBy.difficulty_level = "asc";
        break;
      }
      case "total_likes": {
        orderBy.total_likes = "asc";
        break;
      }
      case "name": {
        orderBy.name = "asc";
        break;
      }
      case "createdAt": {
        orderBy.createdAt = "asc";
        break;
      }
      case "cooking_time": {
        orderBy.cooking_time_minutes = "asc";
        break;
      }
      default: {
        orderBy.id = "asc";
        break;
      }
    }
  }

  if (filters.difficulty !== undefined) {
    whereConditions.push({
      difficulty_level: filters.difficulty,
    });
  }

  if (filters.timeToCook !== undefined) {
    whereConditions.push({
      cooking_time_minutes: { lte: filters.timeToCook.higher },
    });
    whereConditions.push({
      cooking_time_minutes: { gte: filters.timeToCook.lower },
    });
  }

  if (filters.categoryId !== undefined) {
    whereConditions.push({
      categories: { every: { category: { id: filters.categoryId } } },
    });
  }

  // console.log(whereConditions);
  return { orderBy, whereConditions };
};

// if (input.filters !== undefined) {
//   console.log(orderBy);
//   console.log(whereConditions);
//   return ctx.prisma.recipe.findMany({
//     take:
//       input.take !== undefined
//         ? input.take
//         : Constants.DEFAULT_SELECT_NUMBER,
//     where: {
//       AND: [{ is_deleted: false }, ...whereConditions],
//     },
//     orderBy: {
//       ...(orderBy as
//         | Prisma.Enumerable<Prisma.RecipeOrderByWithRelationInput>
//         | undefined),
//     },
//     include: {
//       user: {
//         select: { name: true, id: true },
//       },
//       categories: {
//         select: {
//           category: {
//             select: {
//               name: true,
//               id: true,
//             },
//           },
//         },
//       },
//       images: true,
//     },
//   });
// }
