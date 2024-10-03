"use client";
import { ScrollArea } from "../ui/ScrollArea";
import { cn } from "@/utils/cn";
import { styles } from "@/styles/style";
import { UserAvatar } from "../user/UserAvatar";
import { api } from "@/utils/trpc/react";
import { useSession } from "next-auth/react";
import { createRef, useCallback, useEffect } from "react";

interface ChatMessagesProps {
  chatId: string;
}

export const ChatMessages = ({ chatId }: ChatMessagesProps) => {
  const { data: session } = useSession();
  const [messagesResponse] = api.chat.getChatMessages.useSuspenseQuery({
    chatId,
  });
  const { messages } = messagesResponse;
  const messagesEndRef = createRef<HTMLDivElement>();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  if (messages.length === 0) {
    return (
      <div className="h-full w-full">
        <h2 className={cn(styles.heading2, "text-center")}>
          Write a new message
        </h2>
        <div className="ml-4">
          <p className={cn(styles.paragraph, "")}>For example: </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            eius a facilis, modi placeat ratione amet vitae natus neque labore,
            ab ipsam recusandae, iure et. Qui aliquid optio pariatur. Illum!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ScrollArea className="h-[80vh] w-full">
        {messages.map((m, idx) => (
          <div
            ref={idx + 1 === messages.length ? messagesEndRef : undefined}
            key={idx}
            className="my-4 flex flex-col gap-2 whitespace-pre-wrap py-4 text-base font-normal"
          >
            <div className="flex w-full flex-row border-b border-black/10 p-2 font-semibold dark:border-gray-900/50 dark:bg-slate-800/50">
              <UserAvatar
                className="mr-2 h-6 w-6"
                user={{
                  name:
                    session?.user && session.user.name
                      ? session.user.name
                      : "Anonymous",
                  image:
                    session?.user && session.user.image
                      ? session.user.image
                      : null,
                }}
              />

              {m.prompt}
            </div>
            <div
              className="w-full border-b border-black/10 bg-gray-50 p-2 dark:border-slate-600/50 dark:bg-primaryDark"
              //  bg-[#444654]
            >
              {m.responce}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
