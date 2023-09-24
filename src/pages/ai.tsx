import React from "react";
import Layout from "../components/Layout";
import { api } from "../utils/api";
import { Input } from "../components/ui/FormInput";
import { Form } from "../components/ui/FormProvider";
import { useZodForm } from "../hooks/useZodFormHook";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { ArrowBigRight } from "lucide-react";

const Ai = () => {
  const {
    data: messages,
    isFetching,
    isLoading,
  } = api.chat.getChatMessages.useQuery({
    chatId: "",
  });

  const sendMessage = api.chat.sendMessage.useMutation();

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
      <main className={`py-4`}>
        <div>
          {messages &&
            messages.map((m, idx) => (
              <div key={idx}>
                {/* {m.role}: {m.content} */}
                Message content
              </div>
            ))}

          <Form
            form={form}
            onSubmit={(data: FormData) => {
              console.log(data);
            }}
          >
            <div>
              <Input
                label=""
                hiddenLabel
                type="text"
                placeholder="Send a message."
                required
                {...form.register("message")}
              />
            </div>
            <Button>
              <ArrowBigRight className="h-5 w-5" />
              Send
            </Button>
          </Form>
        </div>
      </main>
    </Layout>
  );
};

export default Ai;
