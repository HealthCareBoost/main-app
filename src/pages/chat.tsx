import { type GetServerSidePropsContext } from "next";
import React, { useCallback, useEffect } from "react";
import { getServerAuthSession } from "../server/auth";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Image from "next/image";
import { Button } from "../components/ui/Button";

const ChatPage: React.FC = () => {
  const router = useRouter();
  const createChat = api.chat.createChat.useMutation();

  const redirectToChat = useCallback(async () => {
    const chatId = await createChat.mutateAsync();
    if (chatId) {
      void router.push(`/chat/${chatId}`);
    }
  }, [createChat, router]);

  useEffect(() => {
    void redirectToChat();
  }, [redirectToChat]);

  return (
    <Layout>
      <div className="container flex w-full flex-col items-center justify-center">
        <div className="mx-auto flex min-h-[350px] min-w-[350px] flex-col justify-evenly space-y-2 text-center">
          <Image
            width={100}
            height={100}
            className="mx-auto h-16 w-16 sm:h-20 sm:w-20"
            src="assets/orange.svg"
            alt="letmecook-logo"
            priority
          />
          <Button
            className="my-2"
            onClick={() => {
              void redirectToChat();
            }}
          >
            Create New Chat
          </Button>
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
