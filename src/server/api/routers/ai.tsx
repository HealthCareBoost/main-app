import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import OpenAI from "openai";

const openai = new OpenAI({
  // apiKey: "my api key",
  // defaults to process.env["OPENAI_API_KEY"]
});

export const chatRouter = createTRPCRouter({
  getChatMessages: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.prisma.chat.findUniqueOrThrow({
        where: {
          id: input.chatId,
        },
        include: {
          messages: true,
        },
      });
      return res;
    }),

  sendMessage: protectedProcedure
    .input(z.object({ chatId: z.string(), message: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log(input.message);

      const previousMessages = await ctx.prisma.chatMessage.findMany({
        where: {
          chat_id: input.chatId,
        },
      });

      const previousMessagesCombined = previousMessages
        .map((message) => {
          return `${message.prompt}\n\n${message.responce}`;
        })
        .join("\n\n");

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input.message }],
        model: "gpt-3.5-turbo",
      });
      console.log(completion);

      const responce = completion.choices[0]?.message.content ?? "";
      console.log(responce);

      await ctx.prisma.chatMessage.create({
        data: {
          prompt: input.message,
          responce: responce,
          chat_id: input.chatId,
        },
      });

      return completion.choices[0]?.message.content ?? "";
    }),

  createChat: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const chat = await ctx.prisma.chat.create({
        data: {
          user_id: ctx.session.user.id,
        },
        select: {
          id: true,
        },
      });

      return chat.id;
    } catch (error) {
      console.error(error);
      return null;
    }
  }),
});
