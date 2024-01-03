import { useZodForm } from "@/src/hooks/useZodFormHook";
import { api } from "@/src/utils/api";
import { z } from "zod";
import { Form } from "../ui/FormProvider";
import { Input } from "../ui/FormInput";
import { Button } from "../ui/Button";
import { ArrowBigUp } from "lucide-react";

interface ChatFormProps {
  onMessageSend?: () => Promise<unknown> | undefined;
}

const chatSchema = z.object({
  message: z.string(),
});

type FormData = z.infer<typeof chatSchema>;

export const ChatForm = ({ onMessageSend }: ChatFormProps) => {
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
        await sendMessage.mutateAsync({
          chatId: "chatId",
          message: data.message,
        });

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
