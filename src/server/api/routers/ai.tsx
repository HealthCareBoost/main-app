import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import OpenAI from "openai";
import { env } from "process";

const openai = new OpenAI({
  // apiKey: "my api key",
  // defaults to process.env["OPENAI_API_KEY"]
});

export const chatRouter = createTRPCRouter({
  /**
   * Get the latest messages of the authenticated user's chats.
   *
   * @function
   * @name getUserChatsPreview
   * @returns {ChatPreview[]} - An array of chat previews
   */
  getUserChatsPreview: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.chat.findMany({
      where: { user_id: ctx.session.user.id },
      select: {
        id: true,
        user_id: true,
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }),

  /**
   * Get all chats of a user
   *
   * @function
   * @name getUserChatsPreview
   * @returns {Chat[]} - An array of chats
   */
  getUserChats: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.chat.findMany({
      where: { user_id: ctx.session.user.id },
      select: {
        id: true,
        user_id: true,
        messages: true,
      },
    });
  }),

  /**
   * Retrieves all messages for a specific chat based on the chat ID.
   *
   * @function
   * @async
   * @name getChatMessages
   *
   * @param {string} chatId - The ID of the chat
   * @returns {Promise<ChatWithMessages>} - A Promise that resolves with the chat data
   */
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

  /**
   * Sends a message to a specific chat
   *
   * @function
   * @async
   * @name sendMessage
   *
   * @param {string} chatId - The ID of the chat
   * @param {string} message - The message content
   * @returns {Promise<string>} - A Promise that resolves with the response generated by the OpenAI model.
   */
  sendMessage: protectedProcedure
    .input(z.object({ chatId: z.string(), message: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const previousMessages = await ctx.prisma.chatMessage.findMany({
        where: {
          chat_id: input.chatId,
        },
      });

      // Combine previous messages for context

      // const previousMessagesCombined = previousMessages
      //   .map((message) => {
      //     return `${message.prompt}\n\n${message.responce}`;
      //   })
      //   .join("\n\n");

      if (!env.OPENAI_ENABLED) throw new Error("No API Credits");
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input.message }],
        model: "gpt-3.5-turbo",
      });

      const responce = completion.choices[0]?.message.content ?? "";

      await ctx.prisma.chatMessage.create({
        data: {
          prompt: input.message,
          responce: responce,
          chat_id: input.chatId,
        },
      });
      return completion.choices[0]?.message.content ?? "";
    }),

  /**
   * Creates a new chat for the authenticated user.
   *
   * @function
   * @async
   * @name createChat
   *
   * @returns {Promise<string | null>} - A Promise that resolves with the ID of the newly created
   *                                     chat or null in case of failure.
   */
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
