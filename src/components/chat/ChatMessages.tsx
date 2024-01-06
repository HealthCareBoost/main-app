import type { ChatMessage } from "@prisma/client";
import { ScrollArea } from "../ui/ScrollArea";
import { cn } from "@/src/utils/cn";
import { styles } from "@/src/styles/style";
import { UserAvatar } from "../user/UserAvatar";
import { useSession } from "next-auth/react";

interface ChatMessagesProps {
  chatId: string;
  messages: ChatMessage[];
}

export const ChatMessages = ({ chatId, messages }: ChatMessagesProps) => {
  const { data: sessionData } = useSession();

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
            key={idx}
            className="my-4 flex flex-col gap-2 whitespace-pre-wrap p-4 text-base font-normal"
          >
            <div className="flex w-full flex-row border-b border-black/10 p-2 font-semibold dark:border-gray-900/50 dark:bg-slate-800/50">
              <UserAvatar
                className="mr-2 h-6 w-6"
                user={{
                  name:
                    sessionData?.user && sessionData.user.name
                      ? sessionData.user.name
                      : "Anonymous",
                  image:
                    sessionData?.user && sessionData.user.image
                      ? sessionData.user.image
                      : null,
                }}
              />

              {m.prompt}
            </div>
            <div
              className="w-full border-b border-black/10 bg-gray-50 p-2
               dark:border-slate-600/50 dark:bg-primaryDark"
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
