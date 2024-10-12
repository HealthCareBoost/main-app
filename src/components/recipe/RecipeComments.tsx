"use client";
import { CommentTextarea } from "@/components/comments/CommentsTextarea";
import { PostItem } from "@/components/comments/Comment";
import { api } from "@/utils/trpc/react";

interface RecipeCommentsProps {
  recipe_id: string;
}

export function RecipeComments({ recipe_id }: RecipeCommentsProps) {
  const [
    recipeComments,
    { refetch: refetchComments, isLoading: isCommentsLoading },
  ] = api.recipe.getCommentsForRecipe.useSuspenseQuery({
    recipe_id,
  });

  const onCommentsChange = async () => {
    if (isCommentsLoading) return;
    await refetchComments();
  };

  return (
    <div className="mx-auto grid w-3/4 gap-4 p-4 sm:gap-8">
      <div className="mx-auto w-3/4 max-w-3xl px-4" id="comments">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primaryDark dark:text-white lg:text-2xl">
            Comments ({recipeComments && recipeComments.comments?.length})
          </h2>
        </div>
        <CommentTextarea
          onCommentCreate={() => void onCommentsChange()}
          recipe_id={recipe_id}
        />
      </div>
      {recipeComments &&
        recipeComments.comments &&
        recipeComments.comments.map((comment) => (
          <PostItem
            key={comment.id}
            {...comment}
            onCommentChange={() => void onCommentsChange()}
          />
        ))}
    </div>
  );
}
