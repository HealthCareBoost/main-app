import { type GetServerSidePropsContext } from "next";
import React from "react";
import Layout from "../components/Layout";
import { ChatMessages } from "../components/chat/ChatMessages";
import { ChatForm } from "../components/chat/Form";

import ChatSidebar from "../components/chat/ChatSidebar";
import { getServerAuthSession } from "../server/auth";

const ChatPage: React.FC = () => {
  return (
    <Layout>
      <div className="container flex h-[85vh] w-full flex-row items-start">
        <aside className="h-full rounded-lg border border-orange-400 bg-card p-4 lg:w-1/5">
          <ChatSidebar />
        </aside>

        <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-8">
          <section>
            <ChatMessages chatId={""} messages={[]} />
          </section>
          <div className="mt-auto mb-0 w-full">
            <ChatForm currentChatId={null} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (!session || !session.user) {
    return { redirect: { destination: "/login" } };
  }

  return { props: {} };
}

export default ChatPage;
