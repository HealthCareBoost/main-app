import { PrismaClient } from "@prisma/client";

import { env } from "../env.mjs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// prisma.$on("query", (e) => {
//   console.log(`Query: ${e.query}`);
//   console.log(`Params: ${e.params}`);
//   console.log(`Duration: ${e.duration} ms`);
// });
if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
