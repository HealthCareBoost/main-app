import { api, HydrateClient } from "@/utils/trpc/server";
import { ChatMessages } from "@/components/chat/ChatMessages";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { ChatForm } from "@/components/chat/Form";

interface ChatPageProps {
  params: { chatId: string };
}

const ChatPage = ({ params }: ChatPageProps) => {
  const { chatId } = params;
  void api.chat.getChatMessages.prefetch({ chatId });

  return (
    <HydrateClient>
      <div className="container flex h-[85vh] w-full flex-row items-start">
        <aside className="h-full rounded-lg border border-orange-400 bg-card p-4 lg:w-1/5">
          <ChatSidebar />
        </aside>

        <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-8 pt-0">
          <section className="mt-0 w-full">
            <ChatMessages chatId={chatId} />
          </section>
          <div className="mb-0 mt-auto w-full">
            <ChatForm currentChatId={chatId} />
          </div>
        </div>
      </div>
    </HydrateClient>
  );
};

export default ChatPage;
