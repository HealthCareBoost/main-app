import Image from "next/image";
import React from "react";
import millify from "millify";
import type { Recipe, DifficultyLevel, RecipeImage } from "@prisma/client";

type RecipePreviewProps = {
  recipes: (Recipe & {
    user: {
      id: string;
      name: string | null;
    };
    images: RecipeImage[];
    categories: {
      category: {
        id: number;
        name: string;
      };
    }[];
  })[];
};

// const DifficultyLevelComponent: React.FC<{
//   difficulty_level: DifficultyLevel;
// }> = ({ difficulty_level }) => {
//   if (difficulty_level === "easy") {
//     return <></>;
//   }

//   if (difficulty_level === "hard") {
//     return <></>;
//   }

//   if (difficulty_level === "medium") {
//     return <></>;
//   }

//   if (difficulty_level === "expert") {
//     return <></>;
//   }

//   return null;
// };

export const RecipePreview: React.FC<RecipePreviewProps> = ({ recipes }) => {
  const maxLength = 3;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-2xl border-2 border-orange-300 bg-gray-50 dark:bg-primaryDark"
          >
            <div className="flex h-[180px] items-center overflow-hidden">
              <Image
                width={1000}
                height={1000}
                src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                alt="Hamburger"
              />
            </div>

            <div className="p-6">
              <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <div>
                  <p className="text-gray-400 dark:text-dimWhite">
                    {recipe.categories.map(({ category }, idx) => {
                      if (idx + 1 > maxLength) return null;
                      return (
                        <span key={`${category.name}${idx}`}>
                          {category.name}
                          {idx !== recipe.categories.length - 1
                            ? idx + 1 >= maxLength
                              ? ""
                              : " • "
                            : ""}
                        </span>
                      );
                      //   Fast Food • Burger
                    })}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
                    {recipe.name}
                  </h2>
                </div>
                <div className="flex flex-col items-center">
                  <span className="mt-2 inline-block rounded-full bg-orange-400 p-3 text-sm font-medium text-white">
                    {" "}
                    Discount 10%{" "}
                  </span>
                </div>
              </div>

              <hr className="mt-4 mb-4" />

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

                  <span className="ml-2 text-gray-600 dark:text-dimWhite">
                    {/* 10 - 15 Mins */}
                    {recipe.preparation_time}
                  </span>
                  {/* <span className="mx-2">•</span>
                <span className="text-gray-400">1Km</span> */}
                </p>

                <p className="inline-flex items-center text-gray-600">
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
                    {/* 5.0 (2.5k)  */}
                    {millify(recipe.total_likes)}
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
