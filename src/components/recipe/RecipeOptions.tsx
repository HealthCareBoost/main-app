"use client";
import React, { useEffect, useState } from "react";
import {
  Bookmark,
  FileEdit,
  Heart,
  HeartOff,
  Home,
  MessageCircle,
  Trash,
} from "lucide-react";
import { BookmarkMinus } from "lucide-react";
import { api } from "@/utils/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "../../hooks/use-toast";
import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/AlertDialog";

export const RecipeOptions: React.FC<{ recipe_id: string }> = ({
  recipe_id,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: userPreferencesData } = api.recipe.getUserPreferences.useQuery({
    recipe_id,
  });
  const { preferences } = userPreferencesData || {};

  const { data: recipeOwner } = api.recipe.getRecipeOwner.useQuery({
    recipe_id,
  });

  const { data: sessionData } = useSession();
  const isLoggedIn = sessionData && sessionData.user;
  const ownRecipe = isLoggedIn && sessionData.user.id === recipeOwner?.user?.id;

  const [isLiked, setIsLiked] = useState<boolean>(
    preferences && preferences.liked ? preferences.liked : false,
  );
  const [isSaved, setIsSaved] = useState<boolean>(
    preferences && preferences.saved ? preferences.saved : false,
  );
  const likeMutation = api.recipe.likeRecipe.useMutation();
  const saveMutation = api.recipe.saveRecipe.useMutation();
  const deleteMutation = api.recipe.delete.useMutation();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  useEffect(() => {
    if (userPreferencesData && userPreferencesData.preferences) {
      setIsLiked(userPreferencesData.preferences.liked);
      setIsSaved(userPreferencesData.preferences.saved);
    }
  }, [userPreferencesData]);

  const onSaveClick = async () => {
    console.log("save");
    if (!sessionData || !sessionData.user) {
      router.push("/login");
      return;
    }
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

    if (!sessionData || !sessionData.user) {
      router.push("/login");
      return;
    }

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

  const onDelete = async () => {
    console.log("delete");
    await deleteMutation.mutateAsync({
      id: recipe_id,
    });
    router.push("/recipe");
    return toast({
      variant: "default",
      title: "Recipe was deleted",
      description: "Recipe was deleted.",
    });
  };

  return (
    <div className="sticky top-10 z-50 h-full w-full flex-shrink flex-grow-0 px-4 sm:w-1/6 lg:w-[10%]">
      <div className="sticky top-0 h-full w-full min-w-[100px] rounded-xl bg-orange-400 p-4 dark:bg-orange-500">
        <ul className="flex content-center justify-center overflow-hidden sm:flex-col">
          <li className="my-2 flex items-center justify-center rounded-md py-2 hover:bg-orange-100 dark:hover:bg-orange-100">
            <button
              className="truncate sm:flex sm:flex-col sm:justify-center"
              onClick={() => {
                // router.back();
                router.push(`/recipe`);
              }}
            >
              <Home
                width={28}
                height={28}
                stroke="black"
                className="mx-4 inline w-7 sm:self-center"
              />
              <span className="hidden self-center text-center dark:text-primaryDark sm:inline">
                Home
              </span>
            </button>
          </li>
          <li className="my-2 flex items-center justify-center rounded-md py-2 hover:bg-orange-100 dark:hover:bg-orange-100">
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
              <span className="hidden self-center text-center dark:text-primaryDark sm:inline">
                Comment
              </span>
            </a>
          </li>
          <li className="my-2 flex items-center justify-center rounded-md py-2 hover:bg-orange-100 dark:hover:bg-orange-100">
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
              <span className="hidden self-center text-center dark:text-primaryDark sm:inline">
                Like
              </span>
            </button>
          </li>
          <li className="my-2 flex items-center justify-center rounded-md py-2 hover:bg-orange-100 dark:hover:bg-orange-100">
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
              <span className="hidden self-center text-center dark:text-primaryDark sm:inline">
                Save
              </span>
            </button>
          </li>
          {ownRecipe ? (
            <>
              <li className="my-2 flex items-center justify-center rounded-md py-2 hover:bg-orange-100 dark:hover:bg-orange-100">
                <button
                  className="truncate sm:flex sm:flex-col sm:justify-center"
                  onClick={() => router.push(`/recipe/update/${recipe_id}`)}
                >
                  <FileEdit
                    width={28}
                    height={28}
                    stroke="black"
                    className="mx-4 inline w-7 sm:self-center"
                  />

                  <span className="hidden self-center text-center dark:text-primaryDark sm:inline">
                    Edit
                  </span>
                </button>
              </li>
              <li className="my-2 flex items-center justify-center rounded-md py-2 hover:bg-orange-100 dark:hover:bg-orange-100">
                <button
                  className="truncate sm:flex sm:flex-col sm:justify-center"
                  onClick={() => setShowDeleteAlert(true)}
                >
                  <Trash
                    width={28}
                    height={28}
                    stroke="black"
                    className="mx-4 inline w-7 sm:self-center"
                  />
                  <span className="hidden self-center text-center dark:text-primaryDark sm:inline">
                    Delete
                  </span>
                </button>
              </li>
            </>
          ) : null}
        </ul>
      </div>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this recipe?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 focus:ring-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-400 dark:focus:ring-red-600"
              onClick={() => void onDelete()}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
