import { useZodForm } from "@/src/hooks/useZodFormHook";
import { api } from "@/src/utils/api";
import { z } from "zod";
import { Form } from "../ui/FormProvider";
import { Input } from "../ui/FormInput";
import { Button } from "../ui/Button";
import { ArrowBigUp } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";

interface ChatFormProps {
  currentChatId: string | null;
  onMessageSend?: () => Promise<unknown> | undefined;
}

const chatSchema = z.object({
  message: z.string(),
});

type FormData = z.infer<typeof chatSchema>;

export const ChatForm = ({ onMessageSend, currentChatId }: ChatFormProps) => {
  const { toast } = useToast();
  const createChat = api.chat.createChat.useMutation();
  const sendMessage = api.chat.sendMessage.useMutation();

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

        if (onMessageSend) {
          await onMessageSend();
        }
        form.reset();
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
          Send
          <ArrowBigUp className="ml-1 h-5 w-5" />
        </Button>
      </div>
    </Form>
  );
};
