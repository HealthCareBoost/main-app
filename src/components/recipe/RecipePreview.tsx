import Image from "next/image";
import React from "react";
import millify from "millify";
import { Separator } from "../ui/Separator";
import { useTheme } from "next-themes";
import type { RecipesQueryResult } from "./RecipeReducer";
import { LoadingPage } from "../Loading";

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
              <Image
                width={1000}
                height={1000}
                src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                alt="Hamburger"
              />
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center justify-between ss:flex-row ss:items-start ">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {recipe.name}
                  </h2>
                  <p className="break-words text-gray-400 dark:text-dimWhite">
                    {recipe.user.name}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="mt-2 flex flex-row items-center rounded-full bg-orange-400 p-3 text-sm font-medium text-white">
                    <span className="mx-2 text-primaryDark dark:text-white">
                      {/* 5.0 (2.5k) */}
                      {millify(2500)}
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
                    {recipe.preparation_time}
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

                {/* <p className="inline-flex items-center text-gray-600">
                  <button
                    onClick={() => {
                      console.log("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 stroke-pink-600"
                      fill={"none"} //"#db2777"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>

                  <span className="ml-2 dark:text-dimWhite">
                      5.0 (2.5k)
                  </span>
                </p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
