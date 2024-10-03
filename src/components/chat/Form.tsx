"use client";
import { useZodForm } from "@/hooks/useZodFormHook";
import { api } from "@/utils/trpc/react";
import { z } from "zod";
import { Form } from "../ui/FormProvider";
import { Input } from "../ui/FormInput";
import { Button } from "../ui/Button";
import { ArrowBigUp, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ChatFormProps {
  currentChatId: string | undefined;
}

const chatSchema = z.object({
  message: z.string(),
});

type FormData = z.infer<typeof chatSchema>;

export const ChatForm = ({ currentChatId }: ChatFormProps) => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState<boolean>(false);

  const createChat = api.chat.createChat.useMutation();
  const sendMessage = api.chat.sendMessage.useMutation();
  const utils = api.useUtils();

  const form = useZodForm({
    schema: chatSchema,
    defaultValues: {
      message: "",
    },
  });

  return (
    <Form
      className="w-full"
      form={form}
      onSubmit={async (data: FormData) => {
        try {
          setIsSending(true);
          if (currentChatId) {
            await sendMessage.mutateAsync({
              chatId: currentChatId,
              message: data.message,
            });
          } else {
            const chatId = await createChat.mutateAsync();
            if (!chatId)
              return toast({
                title: "Error Sending Message!",
                description: "Last Message was not send! Please Try Again!",
                variant: "destructive",
              });

            await sendMessage.mutateAsync({
              chatId,
              message: data.message,
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          await utils.chat.getChatMessages.invalidate({
            chatId: currentChatId,
          });
          setIsSending(false);
          form.reset();
        }
      }}
    >
      <div className="flex w-full flex-row items-center justify-center gap-2">
        <Input
          className="h-full w-full"
          label="Message"
          type="text"
          placeholder="Send a message."
          hiddenLabel
          required
          {...form.register("message")}
        />
        <Button className="mt-2 h-full">
          {isSending ? (
            <Loader2 className={"size-5 animate-spin"} />
          ) : (
            <>
              <span>Send</span>
              <ArrowBigUp className="ml-1 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </Form>
  );
};
