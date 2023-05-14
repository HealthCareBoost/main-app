import Image from "next/image";
import React, { useEffect, useState } from "react";
import millify from "millify";
import { Separator } from "../ui/Separator";
import { useTheme } from "next-themes";
import type { RecipesQueryResult } from "./RecipeReducer";
import { CldImage } from "next-cloudinary";
import { minutesToReadableTime } from "../../utils/timeConverter";
import Link from "next/link";
import { api } from "../../utils/api";
import { Heart, HeartOff } from "lucide-react";
import { useSession } from "next-auth/react";

type RecipePreviewProps = {
  recipe: NonNullable<RecipesQueryResult>;
};

export const RecipePreview: React.FC<RecipePreviewProps> = ({ recipe }) => {
  const { theme } = useTheme();
  const { data: sessionData } = useSession();
  const likeMutation = api.recipe.likeRecipe.useMutation();
  const { data: userPreferences } = api.recipe.getUserPreferences.useQuery({
    recipe_id: recipe.id,
  });
  const [totalLikes, setTotalLikes] = useState<number>(recipe.total_likes);

  const [isLiked, setIsLiked] = useState<boolean>(
    userPreferences && userPreferences.preferences
      ? userPreferences.preferences.liked
      : false
  );

  useEffect(() => {
    if (userPreferences && userPreferences.preferences) {
      setIsLiked(userPreferences.preferences.liked);
    }
  }, [userPreferences]);

  const onLikeClick = async () => {
    if (!sessionData || !sessionData.user) {
      return;
    }

    const { success, error, liked } = await likeMutation.mutateAsync({
      recipe_id: recipe.id,
    });

    if (success) {
      setIsLiked((prev) => {
        setTotalLikes((prevTotal) => {
          if (prev) {
            return prevTotal - 1;
          } else {
            return prevTotal + 1;
          }
        });
        return liked ? liked : !prev;
      });
    }

    // if (!success || error) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Recipe was not liked. Try Again.",
    //     variant: "destructive",
    //   });
    // }
  };

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-orange-300 bg-gray-50 dark:bg-primaryDark">
      <div className="relative flex h-[180px] overflow-hidden">
        {recipe.images.length > 0 &&
        recipe.images[0] &&
        recipe.images[0].path ? (
          <CldImage
            width="600"
            height="600"
            alt="meal"
            priority
            // loading="lazy"
            className="h-auto w-full"
            // v1683539800/let-me-cook/lmfvef1ml3maubbwilqu.webp
            // src="https://res.cloudinary.com/ddm9sjjq5/image/upload/v1683539800/let-me-cook/lmfvef1ml3maubbwilqu.webp"
            src={`https://res.cloudinary.com/ddm9sjjq5/image/upload/${recipe.images[0].path}`}
          ></CldImage>
        ) : (
          <Image
            className="h-auto w-full object-cover"
            src={
              "/default-recipe.png"
              // "https://mysaffronappgc.imgix.net/1676446384966-nFn7yyLwu.jpeg?max-h=800&max-w=1600&fit=crop&auto=compress&ixlib=js-2.3.1&s=953ad10063b1c2d22c5a429aed1fcc89"
            }
            alt={"meal"}
            sizes="h-auto w-full"
            priority
            fill
          />
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center justify-between ss:flex-row ss:items-start ">
          <div className="text-center ss:text-left">
            <Link
              href={`/recipe/${recipe.id}`}
              className="text-lg font-semibold text-gray-800 dark:text-white"
            >
              {recipe.name}
            </Link>
            <p className="break-words text-gray-400 dark:text-dimWhite">
              {recipe.user.name ? recipe.user.name : "Anonymous"}
            </p>
          </div>
          <div
            onClick={() => {
              void onLikeClick();
            }}
            className="flex flex-col items-center"
          >
            <div className="mt-2 flex flex-row items-center rounded-full bg-orange-400 p-3 text-sm font-medium text-white">
              <span className="mx-2 text-base text-primaryDark dark:text-white">
                {/* 5.0 (2.5k) */}
                {millify(totalLikes)}
              </span>
              {isLiked ? (
                <HeartOff
                  className="h-6 w-6"
                  stroke={theme === "dark" ? "white" : "black"}
                />
              ) : (
                <Heart
                  className="h-6 w-6"
                  stroke={theme === "dark" ? "white" : "black"}
                />
              )}
            </div>
          </div>
        </div>

        {/* <hr className="mt-4 mb-4" /> */}
        <Separator
          orientation="horizontal"
          style={{
            backgroundColor:
              theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgb(0 4 15)",
          }}
          className="my-4 h-[2px] dark:h-[1px]"
        />

        <div className="flex w-full flex-wrap justify-between">
          <p className="inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span className="ml-2 text-center text-gray-600 dark:text-dimWhite">
              {/* 10 - 15 Mins */}
              {minutesToReadableTime(
                recipe.preparation_time_minutes + recipe.cooking_time_minutes
              )}
            </span>

            {/* <Separator
                    orientation="vertical"
                    style={{
                      backgroundColor:
                      theme === "dark"
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgb(0 4 15)",
                    }}
                    className="color mx-4 w-[1px]"
                  /> */}
            <span className="mx-2 text-center">•</span>
            <span className="text-center text-gray-600 dark:text-dimWhite">
              {recipe.difficulty_level.charAt(0).toUpperCase() +
                recipe.difficulty_level.slice(1)}{" "}
              Difficulty
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
