import Image from "next/image";
import React from "react";
import { styles } from "../../styles/style";
import { UserAvatar } from "../UserAvatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/HoverCard";
import { AlertTriangle } from "lucide-react";
import { minuteToReadableTime } from "../../utils/timeConverter";
import type { RouterOutputs } from "../../utils/api";
import type {
  MeasurementUnits,
  Recipe as RecipeType,
  RecipeCategory,
  RecipeImage,
  User,
} from "@prisma/client";

type RecipeOutput = Pick<RouterOutputs["recipe"]["getRecipeByID"], "recipe">;
type RecipeComponentProps = {
  recipe: RecipeType & {
    user: User;
    ingredients: {
      ingredient: {
        name: string;
      };
      ingredient_id: number;
      quantity: number;
      measurement_unit: MeasurementUnits;
    }[];
    images: RecipeImage[];
    categories: RecipeCategory[];
  };
};

export const Recipe: React.FC<RecipeComponentProps> = ({ recipe }) => {
  return (
    <>
      {/* <div className="mt-4 flex items-center justify-center">
        <div className="mb-8 border-y border-y-gray-500 py-1 px-3">
          Recipe Preview
        </div>
      </div> */}
      <div className="flex-1">
        <div className="mx-auto mt-8 w-full px-8 py-0">
          <h1
            className={`my-0 border-b border-b-slate-500 pb-2 uppercase ${styles.heading2}`}
          >
            {recipe.name}
          </h1>
          <p
            id="description"
            className={`${styles.paragraph} my-0 mx-auto pb-8 pt-1 pr-3 text-left italic`}
          >
            {recipe.description}
          </p>

          <div className="relative mb-2 w-full bg-slate-100 pt-[50%]">
            <div className="absolute top-0 right-0 flex h-full w-full items-center justify-center overflow-hidden">
              <Image
                className="h-auto w-full"
                src={
                  "https://mysaffronappgc.imgix.net/1676446384966-nFn7yyLwu.jpeg?max-h=800&max-w=1600&fit=crop&auto=compress&ixlib=js-2.3.1&s=953ad10063b1c2d22c5a429aed1fcc89"
                }
                alt={"meal"}
                fill
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="my-4 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
              <div className={`my-4 sm:my-2 sm:pl-4 md:pl-5`}>
                <div
                  className="my-2 flex flex-row items-center justify-between break-words"
                  // style="word-break: break-word;"
                >
                  <UserAvatar
                    user={{
                      name: recipe.user.name ? recipe.user.name : "Anonymous",
                      image: recipe.user.image
                        ? recipe.user.image
                        : "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
                    }}
                    className="mr-2 h-8 w-8 rounded-full"
                  />
                  <a
                    target="blank"
                    href="https://www.simplyrecipes.com/recipes/beef_chili_mac_and_cheese/"
                    className="break-words font-poppins text-[20px] font-bold leading-[32px]"
                  >
                    {recipe.user.name ? recipe.user.name : "Anonymous"}
                  </a>
                </div>
                <div className="font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite">
                  Serves: {recipe.categories.length}
                  {/* To add later */}
                </div>
              </div>

              <div className="my-4 flex items-start sm:my-2 md:mr-8 md:pl-10">
                <div className="pl-0 pr-4">
                  <div className="break-words text-center font-poppins text-lg text-[20px] font-bold uppercase leading-[32px] tracking-wide">
                    Prep
                  </div>
                  <div className="break-words text-center font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite">
                    {minuteToReadableTime(
                      recipe.preparation_time_minutes as number
                    )}
                  </div>
                </div>
                <div className="border-l-2 border-l-slate-300 px-4">
                  <div className="break-words text-center font-poppins text-lg text-[20px] font-bold uppercase leading-[32px] tracking-wide">
                    Cook
                  </div>
                  <div className="break-words text-center font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite">
                    {minuteToReadableTime(recipe.cooking_time_minutes)}
                  </div>
                </div>
                <div className="border-l-2 border-l-slate-300 pl-4 pr-0">
                  <div className="break-words text-center font-poppins text-lg text-[20px] font-bold uppercase leading-[32px] tracking-wide">
                    Total
                  </div>
                  <div
                    data-testid="recipe-time-value-2"
                    className="break-words text-center font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite"
                  >
                    {minuteToReadableTime(
                      recipe.cooking_time_minutes +
                        (recipe.preparation_time_minutes as number)
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4 flex w-full flex-col items-center sm:flex-row sm:justify-between">
              <div className="relative mx-4 mt-1 h-auto first:pt-0 sm:flex sm:flex-col sm:items-center sm:justify-center">
                {recipe.ingredients.map((ingredient, idx) => (
                  <div
                    key={`${ingredient.ingredient_id}${idx}`}
                    className="text-justify font-poppins text-lg font-normal leading-[30.8px] sm:text-left"
                  >
                    <div className="cursor-default break-words">
                      <span className="font-bold text-primaryDark dark:text-white">
                        {`${ingredient.quantity} ${ingredient.measurement_unit}`}
                      </span>
                      {ingredient.ingredient.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mx-4 mt-1 h-auto first:pt-0 sm:flex sm:flex-col sm:items-center sm:justify-center">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle className="uppercase">
                      Nutrition Information
                    </CardTitle>
                    {/* <CardDescription>
                      Deploy your new project in one-click.
                    </CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-row items-center justify-between text-center">
                      {[
                        { name: "CALORIES", amount: 522, unit: "g" },
                        { name: "FAT", amount: 33, unit: "g" },
                        { name: "CARBS", amount: 25, unit: "g" },
                        { name: "PROTEIN", amount: 31, unit: "g" },
                      ].map((n) => (
                        <div key={`${n.name}${Math.random()}`}>
                          <div>{n.name}</div>
                          <div>
                            {n.amount} {n.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start justify-between">
                    <div className="my-2">
                      Nutrition information is calculated using an ingredient
                      database and should be considered an estimate. In cases
                      where multiple ingredient alternatives are given, the
                      first listed is calculated for nutrition. Garnishes and
                      optional ingredients are not included.
                    </div>
                    <HoverCard>
                      <HoverCardTrigger>
                        <div className="flex flex-row items-center justify-between">
                          <AlertTriangle />
                          <p className="mx-2 font-semibold">Additional info</p>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="z-50">
                        The % Daily Value (DV) tells you how much a nutrient in
                        a food serving contributes to a daily diet. 2,000
                        calories a day is used for general nutrition advice.
                      </HoverCardContent>
                    </HoverCard>

                    {/* <Button variant="ghost">Cancel</Button>
                    <Button>Deploy</Button> */}
                  </CardFooter>
                </Card>
              </div>
            </div>

            <div className="my-4 w-full sm:pl-4">
              <ul
                className={`${styles.paragraph} mb-3 mt-0 list-none p-2 pl-0 font-normal text-primaryDark dark:text-white`}
              >
                {recipe.recipe_steps.split("\n").map((step, idx) => (
                  <li className="py-2" key={`${idx}${step.charAt(0)}`}>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
