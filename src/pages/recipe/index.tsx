import React from "react";
import { type NextPage } from "next";
import { LandingNavbar } from "../../components/landing/LandingNavbar";
import { CategorySidebar } from "../../components/CategorySidebar";
import { RecipeGrid } from "../../components/recipe/RecipeGrid";

const RecipePreviewPage: NextPage = () => {
  return (
    <>
      <LandingNavbar />
      <section className="h-full w-full overflow-hidden bg-white dark:bg-primaryDark lg:block">
        <div className="p-4">
          <div className="rounded-md shadow-2xl transition-all">
            <div className="grid grid-cols-4 xl:grid-cols-5">
              <CategorySidebar />
              <div className="col-span-5 ss:col-span-3 ss:border-l ss:border-l-dimWhite ss:dark:border-l-slate-700 xl:col-span-4">
                <div className="h-full px-8 py-6">
                  <RecipeGrid />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipePreviewPage;
