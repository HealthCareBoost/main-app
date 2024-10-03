"use client";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import {
  Bars3BottomLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Button, buttonVariants } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/utils/cn";
import { api } from "@/utils/trpc/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { LoadingSpinner } from "../Loading";

const ChatSidebar = () => {
  const router = useRouter();
  const createChat = api.chat.createChat.useMutation();
  const redirectToChat = useCallback(async () => {
    const chatId = await createChat.mutateAsync();
    if (chatId) {
      void router.push(`/chat/${chatId}`);
    }
  }, [createChat, router]);

  const { data: userChats, isLoading } =
    api.chat.getUserChatsPreview.useQuery();

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center py-20">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <Sheet>
        <SheetTrigger
          className={cn(buttonVariants({ variant: "outline" }), "md:hidden")}
        >
          {/* <Button className="" variant={"outline"}> */}
          <Bars3BottomLeftIcon className="h-5 w-5" />
          {/* </Button> */}
        </SheetTrigger>
        <SheetContent
          // className="w-[400px] sm:w-[540px]"
          side={"left"}
        >
          <SheetHeader className="mb-4 h-[90%]">
            <SheetTitle>Your chats</SheetTitle>
            <ScrollArea className="py-2">
              <ul>
                {userChats &&
                  userChats.length > 0 &&
                  userChats.map((chat, idx) => (
                    <>
                      <li
                        onClick={() => {
                          void router.push(`/chat/${chat.id}`);
                        }}
                        className="mx-auto cursor-pointer rounded-lg border-[0.5px] border-orange-400/70 p-2 text-sm text-card-foreground shadow-sm hover:border-2"
                        key={`${chat.id}${idx}`}
                      >
                        <div className="flex w-full flex-row">
                          <div className="group relative rounded-lg active:opacity-90">
                            {chat.messages[0]?.prompt ?? "No messages"}
                          </div>
                        </div>
                      </li>
                      <div className="my-2" />
                    </>
                  ))}
              </ul>
            </ScrollArea>
          </SheetHeader>
          <SheetFooter>
            <Button
              className="my-2 w-full"
              onClick={() => {
                void redirectToChat();
              }}
            >
              Create New Chat
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div className="hidden h-full md:flex md:flex-col">
        <ScrollArea className="py-2">
          <ul>
            {userChats &&
              userChats.length > 0 &&
              userChats.map((chat, idx) => (
                <>
                  <li
                    onClick={() => {
                      void router.push(`/chat/${chat.id}`);
                    }}
                    className="mx-auto cursor-pointer rounded-lg border-[0.5px] border-orange-400/70 p-2 text-sm text-card-foreground shadow-sm hover:border-2"
                    key={`${chat.id}${idx}`}
                  >
                    <div className="flex w-full flex-row">
                      <div className="group relative rounded-lg active:opacity-90">
                        {chat.messages[0]?.prompt ?? "No messages"}
                      </div>
                    </div>
                  </li>
                  <div className="my-2" />
                </>
              ))}
          </ul>
        </ScrollArea>

        <Button
          className="my-2 mt-auto w-full"
          onClick={() => {
            void redirectToChat();
          }}
        >
          Create New Chat
          <PencilSquareIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default ChatSidebar;
