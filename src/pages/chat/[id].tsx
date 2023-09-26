import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { api } from "../../utils/api";
import { Input } from "../../components/ui/FormInput";
import { Form } from "../../components/ui/FormProvider";
import { useZodForm } from "../../hooks/useZodFormHook";
import { z } from "zod";
import { Button } from "../../components/ui/Button";
import { ArrowBigRight } from "lucide-react";

const ChatPage: NextPage<{ chatId: string }> = ({ chatId }) => {
  // props: InferGetServerSidePropsType<typeof getStaticProps>
  const { data, isFetching, isLoading, refetch } =
    api.chat.getChatMessages.useQuery({
      chatId,
    });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const sendMessage = api.chat.sendMessage.useMutation();

  useEffect(() => {
    if (data && data.messages.length > 0) {
      setMessages(data.messages);
    }
  }, [data]);

  const chatSchema = z.object({
    message: z.string(),
  });

  const form = useZodForm({
    schema: chatSchema,
    defaultValues: {
      message: "",
    },
  });

  type FormData = z.infer<typeof chatSchema>;

  return (
    <Layout>
      <main className={`container py-4 ${styles.boxWidth}`}>
        <div>
          {isLoading && <LoadingSpinner size={128} />}
          {messages.map((m, idx) => (
            <div
              key={idx}
              className="my-4 flex flex-col gap-2 whitespace-pre-wrap p-4 text-base font-normal"
            >
              <div className="w-full border-b border-black/10 p-2 font-semibold dark:border-gray-900/50 dark:bg-slate-800">
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
          <Form
            form={form}
            onSubmit={async (data: FormData) => {
              await sendMessage.mutateAsync({ chatId, message: data.message });
              await refetch();
              form.reset();
            }}
          >
            <div className="flex flex-row items-center gap-2">
              <Input
                label=""
                hiddenLabel
                type="text"
                placeholder="Send a message."
                required
                {...form.register("message")}
              />
              <Button className="h-full">
                <ArrowBigRight className="h-5 w-5" />
                Send
              </Button>
            </div>
          </Form>
          {/* <form className="mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex h-full flex-1 items-stretch md:flex-col">
              <div className="flex w-full items-center">
                <div className="relative flex w-full flex-grow flex-col rounded-xl border border-black/10 bg-white dark:border-gray-900/50 dark:bg-gray-700 dark:text-white">
                  <textarea
                    id="prompt-textarea"
                    tabIndex={0}
                    data-id="97511cc0-6234-41eb-8de6-45fe6a5f70c0"
                    rows={1}
                    placeholder="Send a message"
                    className="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 pl-3 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 md:pl-4"
                    // style="max-height: 200px; height: 44px; overflow-y: hidden;"
                    // spellcheck="false"
                  ></textarea>
                  <button
                    // disabled=""
                    className="absolute right-2 bottom-1.5 rounded-md bg-orange-400 p-1 text-white transition-colors disabled:text-gray-400 disabled:opacity-40 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent md:bottom-3 md:right-3 md:p-2"
                    data-testid="send-button"
                  >
                    <span className="" data-state="closed">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="icon-sm m-1 md:m-0"
                      >
                        <path
                          d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div>
                <div className="ml-1 flex h-full justify-center gap-0 md:m-auto md:mb-4 md:w-full md:gap-2">
                  <div className="grow"></div>
                  <div className="flex items-center md:items-end">
                    <div
                      data-projection-id="26"
                      // style="opacity: 1;"
                    >
                      <button
                        className="relative -z-0 whitespace-nowrap border-0 md:border"
                        role="button"
                      >
                        <div className="flex w-full items-center justify-center gap-2">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon-sm flex-shrink-0"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polyline points="1 4 1 10 7 10"></polyline>
                            <polyline points="23 20 23 14 17 14"></polyline>
                            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form> */}
        </div>
      </main>
    </Layout>
  );
};

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { GetStaticProps, NextPage } from "next";
import superjson from "superjson";
import { appRouter } from "../../server/api/root";
import { prisma } from "../../server/db";
import type { ChatMessage } from "@prisma/client";
import { styles } from "@/src/styles/style";
import { LoadingSpinner } from "@/src/components/Loading";

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
