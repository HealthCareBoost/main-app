import Image from "next/image";
import React, { useState } from "react";
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
import { getColovByDifficulty } from "@/src/utils/recipe/recipeDifficMapper";

type RecipePreviewProps = {
  recipe: NonNullable<RecipesQueryResult>;
};

export const RecipePreview: React.FC<RecipePreviewProps> = ({ recipe }) => {
  const { theme } = useTheme();
  const { data: sessionData } = useSession();
  const likeMutation = api.recipe.likeRecipe.useMutation();
  const [totalLikes, setTotalLikes] = useState<number>(recipe.total_likes);
  const time = minutesToReadableTime(recipe.total_time_minutes);

  const [isLiked, setIsLiked] = useState<boolean>(
    // userPreferences && userPreferences.preferences
    recipe.user_preferences &&
      recipe.user_preferences.length > 0 &&
      recipe.user_preferences[0]
      ? recipe.user_preferences[0]?.liked
      : false
  );

  const onLikeClick = async () => {
    if (!sessionData || !sessionData.user) {
      return;
    }

    const { success, liked } = await likeMutation.mutateAsync({
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
    <div className="h-full w-full overflow-hidden rounded-2xl border-2 border-orange-300 bg-gray-50 dark:bg-primaryDark">
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
            className="h-auto w-full object-cover"
            src={recipe.images[0].url}
            format="auto" //avif, webp
            sizes="(min-width: 480px) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
            crop="thumb"
            // quality="auto:eco"
            // gravity="faces"
            // deliveryType="fetch"
            // transformations={["scale"]}
          />
        ) : (
          <Image
            className="h-auto w-full object-cover"
            src={"/default-recipe.png"}
            alt={"meal"}
            sizes="h-auto w-full"
            priority
            fill
          />
        )}
      </div>

      <div className="p-6">
        <div className="flex h-3/4 flex-col items-center justify-between ss:flex-row ss:items-start">
          <div className="text-center ss:text-left">
            <Link
              href={`/recipe/${recipe.id}`}
              className="text-lg font-semibold text-gray-800 dark:text-white"
            >
              {recipe.name}
            </Link>
            <Link
              href={`/user/${recipe.user.id}`}
              className="block break-words text-gray-400 dark:text-dimWhite"
            >
              {recipe.user.name ? recipe.user.name : "Anonymous"}
            </Link>
          </div>
          <div
            onClick={() => {
              void onLikeClick();
            }}
            className="flex flex-col items-center"
          >
            <div className="mt-2 flex min-w-[75px] flex-row items-center rounded-full bg-orange-400 p-3 text-sm font-medium text-white">
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
          <div className="mx-auto flex w-full flex-col items-center justify-between sm:inline-flex sm:flex-row">
            <div className="flex items-center">
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
                {time ? time : "Instant"}
              </span>
            </div>
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
            {/* <div className="mx-2 text-center">•</div> */}
            {/* <div className="w-m-[75px] mt-2 flex flex-row items-center rounded-full bg-orange-400 p-3 text-sm font-medium text-white"> */}
            <div
              className="min-w-[75px] rounded-full bg-orange-400 p-1 text-center text-sm font-medium capitalize text-primaryDark dark:text-white"
              style={{
                backgroundColor: getColovByDifficulty(recipe.difficulty_level),
              }}
            >
              {`${recipe.difficulty_level}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
