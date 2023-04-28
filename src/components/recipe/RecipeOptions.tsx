import React, { useState } from "react";
import { Bookmark, Heart, HeartOff, Home, MessageCircle } from "lucide-react";
import { BookmarkMinus } from "lucide-react";
import { api } from "../../utils/api";
import { useRouter } from "next/navigation";
import { toast } from "../../hooks/use-toast";

export const RecipeOptions: React.FC<{ recipe_id: string }> = ({
  recipe_id,
}) => {
  // const { theme } = useTheme();

  const router = useRouter();
  const { data, isLoading } = api.recipe.getUserPreferences.useQuery({
    recipe_id,
  });
  const [isLiked, setIsLiked] = useState<boolean>(
    data && data.preferences && data.preferences.liked
      ? data.preferences.liked
      : false
  );
  const [isSaved, setIsSaved] = useState<boolean>(
    data && data.preferences && data.preferences.saved
      ? data.preferences.saved
      : false
  );
  const likeMutation = api.recipe.likeRecipe.useMutation();
  const saveMutation = api.recipe.saveRecipe.useMutation();

  const onSaveClick = async () => {
    console.log("save");
    const { success, error, saved } = await saveMutation.mutateAsync({
      recipe_id,
    });

    if (success) {
      setIsSaved((prev) => (saved ? saved : !prev));
    }

    if (!success || error) {
      return toast({
        title: "Something went wrong.",
        description: "Recipe was not saved. Try Again.",
        variant: "destructive",
      });
    }
  };

  const onLikeClick = async () => {
    console.log("like");
    const { success, error, liked } = await likeMutation.mutateAsync({
      recipe_id,
    });

    if (success) {
      setIsLiked((prev) => (liked ? liked : !prev));
    }

    if (!success || error) {
      return toast({
        title: "Something went wrong.",
        description: "Recipe was not liked. Try Again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full w-full flex-shrink flex-grow-0 px-4 sm:w-1/6 lg:w-[10%]">
      <div className="sticky top-0 h-full w-full rounded-xl bg-orange-50 p-4 dark:bg-orange-500">
        <ul className="flex content-center justify-center overflow-hidden sm:flex-col">
          <li className="rounded-md py-2 hover:bg-orange-300 dark:hover:bg-orange-100">
            <button
              className="truncate sm:flex sm:flex-col sm:justify-center"
              onClick={() => {
                // router.back();
                router.push(`/recipe/${recipe_id}`);
              }}
            >
              <Home
                width={28}
                height={28}
                stroke="black"
                className="mx-4 inline w-7 sm:self-center"
              />
              <span className="hidden text-center dark:text-primaryDark sm:inline">
                Settings
              </span>
            </button>
          </li>
          <li className="rounded-md py-2 hover:bg-orange-300 dark:hover:bg-orange-100">
            <a
              className="truncate sm:flex sm:flex-col sm:justify-center"
              href="#comment"
            >
              <MessageCircle
                width={28}
                height={28}
                stroke="black"
                className="mx-4 inline w-7 sm:self-center"
              />
              <span className="hidden text-center dark:text-primaryDark sm:inline">
                Products
              </span>
            </a>
          </li>
          <li className="rounded-md py-2 hover:bg-orange-300 dark:hover:bg-orange-100">
            <button
              className="truncate sm:flex sm:flex-col sm:justify-center"
              onClick={() => void onLikeClick()}
            >
              {isLiked ? (
                <HeartOff
                  width={28}
                  height={28}
                  stroke="black"
                  className="mx-4 inline w-7 sm:self-center"
                />
              ) : (
                <Heart
                  className="mx-4 inline w-7 sm:self-center"
                  width={28}
                  height={28}
                  stroke="black"
                />
              )}
              <span className="hidden text-center dark:text-primaryDark sm:inline">
                Reports
              </span>
            </button>
          </li>
          <li className="rounded-md py-2 hover:bg-orange-300 dark:hover:bg-orange-100">
            <button
              className="truncate sm:flex sm:flex-col sm:justify-center"
              onClick={() => void onSaveClick()}
            >
              {isSaved ? (
                <BookmarkMinus
                  width={28}
                  height={28}
                  stroke="black"
                  className="mx-4 inline w-7 sm:self-center"
                />
              ) : (
                <Bookmark
                  className="mx-4 inline w-7 sm:self-center"
                  width={28}
                  height={28}
                  stroke="black"
                />
              )}
              <span className="hidden text-center dark:text-primaryDark sm:inline">
                Integrations
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
