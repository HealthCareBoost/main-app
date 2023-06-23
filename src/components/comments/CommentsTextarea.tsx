import React from "react";
import { Textarea } from "../ui/TextArea";
import { Form } from "../ui/FormProvider";
import { useZodForm } from "../../hooks/useZodFormHook";
import { z } from "zod";
import { buttonVariants } from "../ui/Button";
import { cn } from "../../utils/cn";
import { api } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogginParagraph } from "../LogginParagraph";

type CommentTextareaProps = {
  recipe_id: string;
  onCommentCreate: () => void;
};

export const CommentTextarea: React.FC<CommentTextareaProps> = ({
  recipe_id,
  onCommentCreate,
}) => {
  const { toast } = useToast();
  const { data: sessionData } = useSession();
  const router = useRouter();
  const formDisabled = !sessionData || !sessionData.user;

  const commentMutation = api.user.comment.useMutation({
    onError: (error: unknown) => {
      console.error(error);
      return toast({
        title: "Something went wrong.",
        description: "Your comment was not created. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      // onSuccess(_data, _variables, _context) {
      // This forces a cache invalidation.
      // router.refresh();
      // router.push(`/recipe/${recipe_id}#comment`);
      onCommentCreate();
      form.reset();
    },
  });
  const form = useZodForm({
    schema: z.object({
      comment: z.string().min(1),
    }),
  });

  return (
    <Form
      className="mb-6"
      onSubmit={(data) => {
        if (!sessionData || !sessionData.user) {
          router.push(`/login`);
          return;
        }

        // console.log(data);
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
      {formDisabled ? (
        <LogginParagraph actionText={"To leave your comment"} />
      ) : (
        <button
          className={cn(
            buttonVariants(),
            "bg-orange-gradient hover:text-primaryDark hover:dark:text-white"
          )}
          disabled={formDisabled}
        >
          Post Comment
        </button>
      )}
    </Form>
  );
};
