import ChatSidebar from "@/components/chat/ChatSidebar";
import { ChatForm } from "@/components/chat/Form";
import { getServerAuthSession } from "@/server/auth";
import { styles } from "@/styles/style";
import { cn } from "@/utils/cn";
import { redirect } from "next/navigation";
import React from "react";

const ChatPage = async () => {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    return redirect("/login");
  }

  return (
    <div className="container flex h-[85vh] w-full flex-row items-start">
      <aside className="h-full rounded-lg bg-card p-4 md:border md:border-orange-400 lg:w-1/5">
        <ChatSidebar />
      </aside>

      <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-8">
        <section>
          <div className="h-full w-full">
            <h2 className={cn(styles.heading2, "text-center")}>
              Write a new message
            </h2>
            <div className="ml-4">
              <p className={cn(styles.paragraph, "")}>For example: </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
                eius a facilis, modi placeat ratione amet vitae natus neque
                labore, ab ipsam recusandae, iure et. Qui aliquid optio
                pariatur. Illum!
              </p>
            </div>
          </div>
        </section>
        <div className="mb-0 mt-auto w-full">
          <ChatForm currentChatId={undefined} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
