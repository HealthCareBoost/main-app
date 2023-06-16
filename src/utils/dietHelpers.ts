// Calorie intake

import { Diets, HealthProblems } from "./validations/dietSchema";

// W is body weight in kg
// H is body height in cm
// A is age
// F is body fat in percentage

// Mifflin-St Jeor Equation:
// For men:
// BMR = 10W + 6.25H - 5A + 5
// For women:
// BMR = 10W + 6.25H - 5A - 161

// Revised Harris-Benedict Equation:
// For men:
// BMR = 13.397W + 4.799H - 5.677A + 88.362
// For women:
// BMR = 9.247W + 3.098H - 4.330A + 447.593

// Katch-McArdle Formula:
// BMR = 370 + 21.6(1 - F)W

// BMR * activity level coef
// sedentary - 1.2
// lightly active - 1.375
// moderately active - 1.55
// very active - 1.725
// extremly active - 1.9

type FNInput = {
  weight: number;
  height: number;
  age: number;
  biological_gender: "W" | "M";
  activityLevel:
    | "Sedentary"
    | "Lightly Active"
    | "Moderately Active"
    | "Very Active"
    | "Extremely Active";
};

export const ActivityLevelMap = {
  Sedentary: 1.2,
  "Lightly Active": 1.375,
  "Moderately Active": 1.55,
  "Very Active": 1.725,
  "Extremely Active": 1.9,
};

export const calculateCalories: (input: FNInput) => number = ({
  weight,
  activityLevel,
  age,
  biological_gender,
  height,
}) => {
  if (weight < 0 || height < 0 || age < 0) return 0;
  console.log(activityLevel);
  const multiplier = ActivityLevelMap[activityLevel];

  console.log(multiplier);

  if (biological_gender === "M") {
    const mbmr = 10 * weight + 6.25 * height - 5 * age + 5;
    console.log(mbmr);
    console.log(multiplier * mbmr);

    return mbmr * multiplier;
  } else {
    const wbmr = 10 * weight + 6.25 * height - 5 * age - 161;
    console.log(wbmr);
    console.log(multiplier * wbmr);

    return wbmr * multiplier;
  }
};

// export const Diets = {
//   Balanced: "Balanced",
//   Vegetarian: "Vegetarian",
//   Vegan: "Vegan",
//   Gluten: "Gluten Free",
//   Ketogenic: "Ketogenic",
//   Paleo: "Paleo",
// } as const;

// export const HealthProblems = {
//   Alcohol: "Alcohol intolerance",
//   Nut: "Peanuts intolerance",
//   Lactose: "Lactose intolerance",
//   Gluten: "Gluten intolerance",
//   Diabetes: "Diabetes",
//   Cholesterol: "Cholesterol",
// } as const;

export function getRestrictedFoods(input: string): string[] {
  const restrictedFoods: { [key: string]: string[] } = {
    [Diets.Vegetarian]: [
      "meat",
      "poultry",
      "fish",
      "seafood",
      "shellfish",
      "bacon",
      "ham",
      "sausage",
      "beef",
      "pork",
      "lamb",
      "veal",
      "venison",
      "chicken",
      "turkey",
      "duck",
      "goose",
      "salmon",
      "tuna",
      "cod",
      "shrimp",
      "lobster",
      "crab",
      "anchovies",
      "sardines",
      "herring",
      "gelatin",
    ],
    [Diets.Vegan]: [
      "meat",
      "poultry",
      "fish",
      "seafood",
      "shellfish",
      "bacon",
      "ham",
      "sausage",
      "beef",
      "pork",
      "lamb",
      "veal",
      "venison",
      "chicken",
      "turkey",
      "duck",
      "goose",
      "salmon",
      "tuna",
      "cod",
      "shrimp",
      "lobster",
      "crab",
      "anchovies",
      "sardines",
      "herring",
      "gelatin",
      "dairy",
      "milk",
      "cheese",
      "yogurt",
      "butter",
      "cream",
      "honey",
      "egg",
    ],
    [Diets.Gluten]: [
      "wheat",
      "barley",
      "rye",
      "triticale",
      "spelt",
      "kamut",
      "semolina",
      "durum",
      "farina",
      "grahamflour",
      "bulgur",
      "couscous",
      "malt",
      "brewer'syeast",
      "wheatstarch",
      "wheatbran",
      "wheatgerm",
    ],
    [Diets.Ketogenic]: [], // Add ketogenic diet
    [Diets.Paleo]: [], // Add paleo diet restrictions
    [HealthProblems.Alcohol]: [
      "alcohol",
      "beer",
      "wine",
      "liquor",
      "spirits",
      "cocktails",
      "brandy",
      "whiskey",
      "rum",
      "vodka",
      "tequila",
      "gin",
      "sake",
      "liqueurs",
    ],
    [HealthProblems.Nut]: [
      "almonds",
      "peanuts",
      "cashews",
      "walnuts",
      "hazelnuts",
      "pistachios",
      "pecans",
    ],
    [HealthProblems.Lactose]: [
      "milk",
      "cheese",
      "yogurt",
      "butter",
      "cream",
      "ice cream",
      "whey",
      "cottage cheese",
      "sour cream",
      "cream cheese",
      "buttermilk",
      "milk powder",
      "chocolate",
    ],
    [HealthProblems.Gluten]: [
      "wheat",
      "barley",
      "rye",
      "triticale",
      "spelt",
      "kamut",
      "semolina",
      "durum",
      "farina",
      "grahamflour",
      "bulgur",
      "couscous",
      "malt",
      "brewer'syeast",
      "wheatstarch",
      "wheatbran",
      "wheatgerm",
    ],
    [HealthProblems.Diabetes]: [
      "sugar",
      "white rice",
      "white bread",
      "white pasta",
      "soda",
      "fruit juices",
      "candy",
      "cookies",
      "cakes",
      "pastries",
      "syrups",
      "ice cream",
      "coffee drinks",
    ],
    [HealthProblems.Cholesterol]: [
      "sausage",
      "hot dog",
      "bacon",
      "whole milk",
      "cheese",
      "cookie",
      "doughnuts",
      "potato chip",
      "french fries",
      "palm oil",
      "coconut oil",
      "hydrogenated oils",
      "lard",
      "shortening",
    ],
  };

  const restrictedFoodsList = restrictedFoods[input];
  // let result = "";
  // if (restrictedFoodsList && restrictedFoodsList.length > 0) {
  //   result = restrictedFoodsList.reduce(
  //     (prev, curr) => prev.concat(`${curr}, `),
  //     ""
  //   );
  // }
  return restrictedFoodsList && restrictedFoodsList.length > 0
    ? restrictedFoodsList
    : [];
  // return result;
}
