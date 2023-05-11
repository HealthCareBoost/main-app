import Image from "next/image";
import React from "react";
import millify from "millify";
import { Separator } from "../ui/Separator";
import { useTheme } from "next-themes";
import type { RecipesQueryResult } from "./RecipeReducer";
import { CldImage } from "next-cloudinary";
import { minutesToReadableTime } from "../../utils/timeConverter";

type RecipePreviewProps = {
  recipes: NonNullable<RecipesQueryResult>;
};

export const RecipePreview: React.FC<RecipePreviewProps> = ({ recipes }) => {
  const { theme } = useTheme();

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-2xl border-2 border-orange-300 bg-gray-50 dark:bg-primaryDark"
          >
            <div className="relative flex h-[180px] items-center overflow-hidden">
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
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {recipe.name}
                  </h2>
                  <p className="break-words text-gray-400 dark:text-dimWhite">
                    {recipe.user.name ? recipe.user.name : "Anonymous"}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="mt-2 flex flex-row items-center rounded-full bg-orange-400 p-3 text-sm font-medium text-white">
                    <span className="mx-2 text-primaryDark dark:text-white">
                      {/* 5.0 (2.5k) */}
                      {millify(recipe.total_likes)}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* <hr className="mt-4 mb-4" /> */}
              <Separator
                orientation="horizontal"
                style={{
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgb(0 4 15)",
                }}
                className="my-4 h-[2px] dark:h-[1px]"
              />

              <div className="flex flex-wrap justify-between">
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
                      recipe.preparation_time_minutes +
                        recipe.cooking_time_minutes
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
        ))}
      </div>
    </div>
  );
};
