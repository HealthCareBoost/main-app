import React from "react";
import { styles } from "../../styles/style";
import { RecomendedRecipes } from "../recipe/Recomended";
import { api } from "@/src/utils/api";

export const LandingBilling: React.FC = () => {
  const { data } = api.recipe.getPaginatedRecipes.useQuery({ take: 8 });

  return (
    <>
      <div
        className={`grid h-full grid-cols-1 gap-4 sm:grid-cols-4 ${styles.paddingY}`}
      >
        <div className="sm:col-span-full">
          {data && data.recipes && data.recipes.length > 0 && (
            <RecomendedRecipes recipes={data.recipes} />
          )}
        </div>
      </div>
    </>
  );
};
