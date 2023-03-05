import type { Prisma, PrismaClient } from "@prisma/client";
import { type Session } from "next-auth";

export const mapNameToUser = async (ctx: {
  session: Session | null;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}) => {
  try {
    if (
      ctx.session &&
      (ctx.session.user.name === null || ctx.session.user.name === undefined)
    ) {
      // update name
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (user && user.email) {
        const result = await ctx.prisma.nameEmailMap.findUnique({
          where: { email: user.email },
        });
        if (result) {
          await ctx.prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              name: result?.name,
            },
          });
          await ctx.prisma.nameEmailMap.delete({
            where: {
              email: user.email,
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("mapNameToUser Error");
    console.error(error);
  }
};
