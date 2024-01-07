import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { api } from "../../utils/api";
import { LoadingSpinner } from "@/src/components/Loading";
import { ChatForm } from "@/src/components/chat/Form";
import { ChatMessages } from "@/src/components/chat/ChatMessages";
import ChatSidebar from "@/src/components/chat/ChatSidebar";

const ChatPage: NextPage<{ chatId: string }> = ({ chatId }) => {
  // props: InferGetServerSidePropsType<typeof getStaticProps>
  const { data, isLoading, refetch } = api.chat.getChatMessages.useQuery({
    chatId,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  useEffect(() => {
    if (data && data.messages.length > 0) {
      setMessages(data.messages);
    }
  }, [data]);

  return (
    <Layout>
      <div className="container flex h-[85vh] w-full flex-row items-start">
        <aside className="h-full rounded-lg border border-orange-400 bg-card p-4 lg:w-1/5">
          <ChatSidebar />
        </aside>

        <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-8 pt-0">
          <section className="mt-0 w-full">
            {isLoading && <LoadingSpinner />}
            {!isLoading && data ? (
              <ChatMessages chatId={chatId} messages={messages} />
            ) : null}
          </section>
          <div className="mt-auto mb-0 w-full">
            <ChatForm currentChatId={chatId} onMessageSend={refetch} />
          </div>
        </div>
      </div>
    </Layout>
    // <Layout>
    //   <main className={`container py-4 ${styles.boxWidth}`}>
    //     <div>
    //       {isLoading && <LoadingSpinner size={128} />}
    //       <ChatMessages chatId={chatId} messages={messages} />
    //       <ChatForm onMessageSend={refetch} currentChatId={chatId} />
    //     </div>
    //   </main>
    // </Layout>
  );
};

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { GetStaticProps, NextPage } from "next";
import superjson from "superjson";
import { appRouter } from "../../server/api/root";
import { prisma } from "../../server/db";
import type { ChatMessage } from "@prisma/client";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });

  const id = context.params?.id as string;
  await ssg.chat.getChatMessages.prefetch({ chatId: id });

  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      chatId: id,
    },
  };
};

export function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export default ChatPage;
