import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import OpenAI from "openai";

const openai = new OpenAI({
  // apiKey: "my api key",
  // defaults to process.env["OPENAI_API_KEY"]
});

export const chatRouter = createTRPCRouter({
  getChatMessages: publicProcedure
    .input(z.object({ chatId: z.string().optional() }))
    .query(({ input, ctx }) => {
      return [];
    }),

  sendMessage: protectedProcedure
    .input(z.object({ chatId: z.string().optional(), message: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // get previous chat entries

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input.message }],
        model: "gpt-3.5-turbo",
      });

      // update save prompt + response

      return completion.choices[0]?.message.content ?? "";
    }),
});
