import { AlertTriangle } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import React from "react";
import { styles } from "../../styles/style";
import type { RecipeComponentProps } from "../../utils/recipe/recipeTypes";
import { minutesToReadableTime } from "../../utils/timeConverter";
import { UserAvatar } from "@/components/user/UserAvatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/HoverCard";
import { Separator } from "../ui/Separator";
import { roundNumber } from "@/utils/numbers";
import { shortenText } from "@/utils/shortenText";
import { Constants } from "@/utils/constants";

export const Recipe: React.FC<RecipeComponentProps> = ({ recipe }) => {
  const displayNutrion: () => React.ReactNode[] = () => {
    const nodes: React.ReactNode[] = [];
    if (recipe.nutrition) {
      const sortedByKey = new Map([...recipe.nutrition].sort());

      sortedByKey.forEach(({ amount, unit }, key) => {
        if (key === "Sugar") return;
        nodes.push(
          <div key={`${key}${amount}`}>
            <div className="uppercase">
              {key === "Carbohydrates" ? "CARBS" : key}
            </div>
            <div>
              {roundNumber(amount, 2)} {unit}
            </div>
          </div>,
        );
      });
    }

    if (recipe.nutrition === undefined || recipe.nutrition.size === 0) {
      [
        { name: "CALORIES", amount: 522, unit: "g" },
        { name: "FAT", amount: 33, unit: "g" },
        { name: "CARBS", amount: 25, unit: "g" },
        { name: "PROTEIN", amount: 31, unit: "g" },
      ].forEach((n) => {
        nodes.push(
          <div key={`${n.name}${Math.random()}`}>
            <div>{n.name}</div>
            <div>
              {n.amount} {n.unit}
            </div>
          </div>,
        );
      });
    }

    return nodes;
  };

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

          <div className="relative mb-2 w-full bg-slate-100 pt-[50%]">
            <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center overflow-hidden">
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
                  src={recipe.images[0].url}
                ></CldImage>
              ) : (
                <Image
                  className="h-auto w-full object-cover"
                  priority
                  src={"/default-recipe.png"}
                  alt={"meal"}
                  fill
                />
              )}
            </div>
          </div>

          <p
            id="description"
            className={`${styles.paragraph} mx-auto my-0 pb-8 pr-3 pt-1 text-left italic`}
          >
            {shortenText(
              recipe.description,
              Constants.MAX_DESCRIPTION_SENTENCES,
            )}
          </p>

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
                      image: recipe.user.image,
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
                  Serves: {recipe.ingredients.length}
                  {/* To add later */}
                </div>
              </div>

              <div className="my-4 flex items-start sm:my-2 md:mr-8 md:pl-10">
                <div className="pl-0 pr-4">
                  <div className="break-words text-center font-poppins text-[20px] text-lg font-bold uppercase leading-[32px] tracking-wide">
                    Prep
                  </div>
                  <div className="break-words text-center font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite">
                    {minutesToReadableTime(recipe.preparation_time_minutes)}
                  </div>
                </div>
                <div className="border-l-2 border-l-slate-300 px-4">
                  <div className="break-words text-center font-poppins text-[20px] text-lg font-bold uppercase leading-[32px] tracking-wide">
                    Cook
                  </div>
                  <div className="break-words text-center font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite">
                    {minutesToReadableTime(recipe.cooking_time_minutes)}
                  </div>
                </div>
                <div className="border-l-2 border-l-slate-300 pl-4 pr-0">
                  <div className="break-words text-center font-poppins text-[20px] text-lg font-bold uppercase leading-[32px] tracking-wide">
                    Total
                  </div>
                  <div
                    data-testid="recipe-time-value-2"
                    className="break-words text-center font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite"
                  >
                    {minutesToReadableTime(recipe.total_time_minutes)}
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4 flex w-full flex-col items-center sm:flex-row sm:justify-between">
              <div className="relative mx-4 mt-1 h-auto self-baseline first:pt-0 sm:flex sm:flex-col sm:justify-center">
                <div
                  className={`mb-2 w-full cursor-default break-words text-justify font-poppins text-[30px] text-lg font-semibold leading-[30.8px] text-primaryDark dark:text-white xs:text-[32px] sm:text-left`}
                >
                  Ingredients
                </div>
                {recipe.ingredients.map((ingredient, idx) => (
                  <div
                    key={`${ingredient.id}${idx}`}
                    className="my-2 text-justify font-poppins text-lg font-normal leading-[30.8px] sm:text-left"
                  >
                    {/* <div className="cursor-default break-words">
                      <span className="font-bold text-slate-700"></span>
                      For the chili:
                    </div>
                    <div className="cursor-default break-words">
                      <span className="font-bold text-slate-700">2 cups </span>
                      uncooked elbow pasta
                    </div>
                    <div className="cursor-default break-words">
                      <span className="font-bold text-slate-700">
                        1 tablespoon{" "}
                      </span>
                      vegetable oil
                    </div> */}
                    <div className="cursor-default break-words text-dimDark dark:text-dimWhite">
                      <span className="mx-1 font-medium text-primaryDark dark:text-white">
                        {`${ingredient.quantity} ${ingredient.measurement_unit}`}
                      </span>
                      {ingredient.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mx-4 mt-1 h-auto self-baseline first:pt-0 sm:flex sm:flex-col sm:items-center sm:justify-center">
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
                      {displayNutrion()}
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
                        <Separator />
                        <p className="mt-2 text-xs text-red-500">
                          Also the nutrition information given may not be true.
                          Please don&apos;t sue us!
                        </p>
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
