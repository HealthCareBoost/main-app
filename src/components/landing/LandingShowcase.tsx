import React from "react";
import { styles } from "../../styles/style";
import { api } from "@/utils/trpc/server";
import { Constants } from "@/utils/constants";

export const LandingShowcase: React.FC = async () => {
  const { recipes } = await api.recipe.getPaginatedRecipes({
    take: 8,
    filters: { orderBy: "createdAt" },
  });

  void api.recipe.getLatest({
    take: Constants.MAX_SEARCH,
  });

  return (
    <>
      <div
        className={`grid h-full grid-cols-1 gap-4 sm:grid-cols-4 ${styles.paddingY}`}
      >
        <div className="sm:col-span-full">
          {recipes && recipes.length > 0 && (
            <div>{JSON.stringify(recipes)}</div>
            // <RecomendedRecipes recipes={data.recipes} />
          )}
        </div>
      </div>
    </>
  );
};
