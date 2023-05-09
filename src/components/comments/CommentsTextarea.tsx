import React from "react";
import { Textarea } from "../ui/TextArea";
import { Form } from "../ui/FormProvider";
import { useZodForm } from "../../hooks/useZodFormHook";
import { z } from "zod";
import { buttonVariants } from "../ui/Button";
import { cn } from "../../utils/cn";
import { api } from "../../utils/api";
import { toast } from "../../hooks/use-toast";
import { useRouter } from "next/navigation";

export const CommentTextarea: React.FC<{ recipe_id: string }> = ({
  recipe_id,
}) => {
  const router = useRouter();
  const commentMutation = api.user.comment.useMutation({
    onError: (error: unknown) => {
      console.error(error);
      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      // onSuccess(_data, _variables, _context) {
      // This forces a cache invalidation.
      router.refresh();
      router.push(`/recipe/${recipe_id}#comment`);
    },
  });
  const form = useZodForm({
    schema: z.object({
      comment: z.string().min(1),
    }),
  });

  return (
    //
    <div className="mx-auto w-3/4 max-w-3xl px-4" id="comments">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-primaryDark dark:text-white lg:text-2xl">
          Comments (21)
        </h2>
      </div>
      <Form
        className="mb-6"
        onSubmit={(data) => {
          console.log(data);
          commentMutation.mutate({
            recipe_id,
            text: data.comment,
          });
        }}
        form={form}
      >
        <Textarea
          label="comment"
          hiddenLabel
          rows={6}
          placeholder="Write a comment..."
          className={cn(
            "mb-6 w-full rounded-lg rounded-t-lg border border-slate-300 bg-white py-2 px-4 text-sm focus:outline-none focus:ring-0 dark:border-slate-700 dark:bg-primaryDark dark:placeholder-slate-400"
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
