import React from "react";
import { Textarea } from "../ui/TextArea";
import { Form } from "../ui/FormProvider";
import { useZodForm } from "../../utils/useZodFormHook";
import { z } from "zod";
import { buttonVariants } from "../ui/Button";
import { cn } from "../../utils/cn";

export const CommentTextarea: React.FC = () => {
  const form = useZodForm({
    schema: z.object({
      comment: z.string().min(1),
    }),
  });

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-primaryDark dark:text-white lg:text-2xl">
          Comments (21)
        </h2>
      </div>
      <Form className="mb-6" onSubmit={(data) => console.log(data)} form={form}>
        <Textarea
          label="comment"
          hiddenLabel
          rows={6}
          placeholder="Write a comment..."
          className={cn(
            "mb-6 w-full rounded-lg rounded-t-lg border border-slate-300 bg-white py-2 px-4 text-sm focus:outline-none focus:ring-0 dark:border-slate-700 dark:bg-bgDark dark:placeholder-slate-400"
          )}
          required
          {...form.register("comment")}
        />
        <button
          className={cn(
            buttonVariants(),
            "bg-orange-gradient hover:text-primaryDark hover:dark:text-white"
          )}
        >
          Post Comment
        </button>
      </Form>
    </div>
  );
};
