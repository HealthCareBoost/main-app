import React, { useContext } from "react";
import { api } from "../../utils/api";
import { DifficultyLevel, TimeIntervals } from "../../utils/enumsMap";
import { RecipeContext } from "./RecipeContext";
import { RecipeReducerActions } from "./RecipeReducer";

// type CategorySidebarProps = {
//   // categories: [];
// };

type ButtonProps = {
  text: string;
  selected?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

const OptionButton: React.FC<ButtonProps> = ({
  text,
  children,
  onClick,
  selected,
}) => {
  const btnStyles = selected
    ? "inline-flex h-9 w-full items-center justify-start rounded-md bg-slate-200 px-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800"
    : "inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent";
  return (
    <>
      {/* <button class="inline-flex h-9 w-full items-center justify-start rounded-md bg-slate-100 px-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800"></button> */}
      {/* <button className="bg-slate-100 font-medium text-slate-900 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800"> */}
      <button
        onClick={onClick}
        className={btnStyles}
        // className="inline-flex h-9 w-full items-center justify-start rounded-md
        // bg-transparent px-2 text-sm font-medium transition-colors
        // hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400
        // focus:ring-offset-2 active:scale-95 disabled:pointer-events-none
        // disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent"
      >
        {children} {text}
      </button>
    </>
  );
};

export const CategorySidebar: React.FC = () => {
  const { recipeDispatch, recipeState } = useContext(RecipeContext);
  const categoriesQuery = api.category.getAll.useQuery();

  return (
    <aside className="hidden min-w-[180px] pb-12 ss:block">
      <div className="px-8 py-6">
        <p className="flex items-center text-2xl font-semibold tracking-tight">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="hidden h-6 w-6 md:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
            />
          </svg>
          Categories
        </p>
      </div>

      <div className="space-y-4">
        <div className="px-6 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Time To Prepere
          </h2>
          <div className="space-y-1">
            {Array.from(Object.entries(TimeIntervals)).map(([key, val]) => (
              <OptionButton
                key={key}
                text={key}
                selected={
                  recipeState.selectedTimeToCook &&
                  recipeState.selectedTimeToCook.lower === val.lower &&
                  recipeState.selectedTimeToCook.higher === val.higher
                }
                onClick={() => {
                  // Check to see If this value is already selected
                  if (
                    recipeState.selectedTimeToCook &&
                    recipeState.selectedTimeToCook.lower === val.lower &&
                    recipeState.selectedTimeToCook.higher === val.higher
                  ) {
                    recipeDispatch({
                      type: RecipeReducerActions.CHANGE_TIME_TO_COOK,
                      payload: {
                        selectedTimeToCook: undefined,
                      },
                    });
                  } else {
                    recipeDispatch({
                      type: RecipeReducerActions.CHANGE_TIME_TO_COOK,
                      payload: {
                        selectedTimeToCook: {
                          higher: val.higher,
                          lower: val.lower,
                        },
                        // orderBy: "cooking_time",
                      },
                    });
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
              </OptionButton>
            ))}
          </div>
        </div>

        <div className="px-6 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Difficulty
          </h2>
          <div className="space-y-1">
            {Object.entries(DifficultyLevel).map(([key, val]) => (
              <OptionButton
                selected={val === recipeState.selectedDifficulty}
                onClick={() => {
                  // Check to see If this value is already selected
                  if (val === recipeState.selectedDifficulty) {
                    recipeDispatch({
                      type: RecipeReducerActions.CHANGE_DIFFICULTY,
                      payload: {
                        selectedDifficulty: undefined,
                      },
                    });
                  } else {
                    recipeDispatch({
                      type: RecipeReducerActions.CHANGE_DIFFICULTY,
                      payload: {
                        selectedDifficulty: val,
                        // orderBy: "difficulty_level",
                      },
                    });
                  }
                }}
                key={key}
                text={val.charAt(0).toUpperCase() + val.slice(1)}
              ></OptionButton>
            ))}
          </div>
        </div>

        <div className="px-6 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <div
            dir="ltr"
            // overflow-hidden
            className="space-y-1"
            //     --radix-scroll-area-corner-width: 0px;
            //     --radix-scroll-area-corner-height: 0px;
          >
            <div
              //overflow-y-scroll
              className="scrollbar h-full w-full rounded-[inherit]"
            >
              <div className="table min-w-full space-y-1 p-2">
                {categoriesQuery.data &&
                  categoriesQuery.data.length > 1 &&
                  categoriesQuery.data.map((category) => (
                    <OptionButton
                      key={category.id}
                      text={category.name}
                      selected={category.id === recipeState.selectedCategoryId}
                      onClick={() => {
                        // Check to see If this value is already selected
                        if (category.id === recipeState.selectedCategoryId) {
                          recipeDispatch({
                            type: RecipeReducerActions.CHANGE_CATEGORY,
                            payload: {
                              selectedCategoryId: undefined,
                            },
                          });
                        } else {
                          recipeDispatch({
                            type: RecipeReducerActions.CHANGE_CATEGORY,
                            payload: {
                              selectedCategoryId: category.id,
                              // orderBy: "total_likes",
                            },
                          });
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M21 15V6"></path>
                        <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                        <path d="M12 12H3"></path>
                        <path d="M16 6H3"></path>
                        <path d="M12 18H3"></path>
                      </svg>
                    </OptionButton>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
