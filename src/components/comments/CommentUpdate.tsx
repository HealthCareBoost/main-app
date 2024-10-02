import React from "react";
import { Textarea } from "../ui/TextArea";
import { Form } from "../ui/FormProvider";
import { useZodForm } from "../../hooks/useZodFormHook";
import { z } from "zod";
import { buttonVariants } from "../ui/Button";
import { cn } from "../../utils/cn";
import { api } from "@/utils/trpc/react";
import { useToast } from "../../hooks/use-toast";

type UpdateCommentProps = {
  recipe_id: string;
  comment_id: string;
  text: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: () => void;
};

export const UpdateCommentTextarea: React.FC<UpdateCommentProps> = ({
  comment_id,
  text,
  setIsEditing,
  onUpdate,
}) => {
  const { toast } = useToast();
  const updateCommentMutation = api.user.updateComment.useMutation({
    onError: (error: unknown) => {
      console.error(error);
      setIsEditing(false);
      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      // onSuccess(_data, _variables, _context) {
      // This forces a cache invalidation.
      setIsEditing(false);
      onUpdate();
      // router.refresh();
      // router.push(`/recipe/${recipe_id}#comment`);
    },
  });
  const form = useZodForm({
    schema: z.object({
      comment: z.string().min(1),
    }),
    defaultValues: { comment: text },
  });

  return (
    <Form
      className="mb-6"
      onSubmit={(data) => {
        // console.log(data);
        updateCommentMutation.mutate({
          comment_id,
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
          "mb-6 w-full rounded-lg rounded-t-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-0 dark:border-slate-700 dark:bg-primaryDark dark:placeholder-slate-400",
        )}
        required
        {...form.register("comment")}
      />
      <button
        className={cn(
          buttonVariants(),
          "bg-orange-gradient hover:text-primaryDark hover:dark:text-white",
        )}
      >
        Update
      </button>
    </Form>
  );
};
