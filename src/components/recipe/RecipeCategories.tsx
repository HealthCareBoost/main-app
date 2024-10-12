"use client";

import { api } from "@/utils/trpc/react";

export function RecipeCategories({ recipe_id }: { recipe_id: string }) {
  const [{ recipe, success }] = api.recipe.getRecipeByID.useSuspenseQuery({
    id: recipe_id,
  });

  if (!success || !recipe) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol
        role="list"
        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        {recipe.categories.map(({ category }, idx) => (
          <li key={`${category.id}${idx}${Math.random()}`}>
            <div className="flex items-center">
              <a
                href="#"
                className="mr-2 text-sm font-medium text-primaryDark dark:text-white"
              >
                {category.name}
              </a>
              {/* last element in category array */}
              {idx + 1 === recipe.categories.length ? null : (
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
