export const TimeUnits = {
  seconds: "seconds",
  minutes: "minutes",
  hours: "hours",
} as const;

export const DifficultyLevel = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
  expert: "expert",
} as const;

export const Categories = {
  Appetizer: "Appetizer",
  Main_Dishe: "Main Dish",
  Desserts: "Desserts",
  Vegetarian: "Vegetarian",
  Vegan: "Vegan",
  Breakfast: "Breakfast",
  Beverage: "Beverage",
  Snack: "Snack",
  Soup: "Soup",
  Salad: "Salad",
  Seafood: "Seafood",
  Chicken: "Chicken",
  Beef: "Beef",
  Pork: "Pork",
  Lamb: "Lamb",
  Slow: "Slow",
  Instant: "Instant",
  Baked: "Baked",
  Gluten_Free: "Gluten Free",
  Dairy_Free: "Dairy Free",
  Low_carb: "Low carb",
  High_Protein: "High Protein",
  Budget_Friendly: "Budget Friendly",
  Classic: "Classic",
  Grill: "Grill",
  Barbecue: "Barbecue",
  Healthy: "Healthy",
} as const;

export const MealTypes = {
  BREAKFAST: "BREAKFAST",
  DINNER: "DINNER",
  LUNCH: "LUNCH",
  SNACK: "SNACK",
} as const;

export const MeasurementUnits = {
  Milliliter: "Milliliter",
  Liter: "Liter",
  Teaspoon: "Teaspoon",
  Tablespoon: "Tablespoon",
  Fluid_Ounce: "Fluid_Ounce",
  Cup: "Cup",
  Pint: "Pint",
  Quart: "Quart",
  Gallon: "Gallon",
  Milligram: "Milligram",
  Gram: "Gram",
  Kilogram: "Kilogram",
  Pound: "Pound",
  Ounce: "Ounce",
  Drop: "Drop",
  Pinch: "Pinch",
  Dash: "Dash",
  Sprinkle: "Sprinkle",
  Handful: "Handful",
  Clove: "Clove",
  Head: "Head",
  Slice: "Slice",
  Piece: "Piece",
  Can: "Can",
  Package: "Package",
  Stick: "Stick",
  Dozen: "Dozen",
  Bunch: "Bunch",
  Stalk: "Stalk",
} as const;

export const TimeIntervals = {
  "< 30 min": {
    lower: 0,
    higher: 30,
  },
  "< 60 min": {
    lower: 30,
    higher: 60,
  },
  "> 60 min": {
    lower: 60,
    higher: 3 * 24 * 60,
  },
} as const;

export const RecipeFiltersMap = {
  name: "Name",
  cooking_time: "Time",
  total_likes: "Likes",
  createdAt: "Newest",
  difficulty_level: "Difficulty",
} as const;

export type OrderByValues =
  | "name"
  | "cooking_time"
  | "total_likes"
  | "createdAt"
  | "difficulty_level";

export const LABEL_COLORS = {
  red_200: "#fecaca",
  red_600: "#dc2626",
  rose_200: "#fecdd3",

  amber_200: "#fde68a",
  yellow_200: "#fef08a",
  yellow_500: "#eab308",

  orange_400: "#fb923c",
  orange_600: "#ea580c",
  orange_700: "#c2410c",

  purple_200: "#e9d5ff",
  violet_200: "#ddd6fe",

  green_200: "#bbf7d0",
  green_500: "#22c55e",
  emerald_200: "#a7f3d0",

  indigo_200: "#c7d2fe",
  blue_200: "#bfdbfe",
  sky_200: "#bae6fd",
} as const;

export const MEAL_TYPE_COLORS = {
  BREAKFAST: LABEL_COLORS.amber_200,
  DINNER: LABEL_COLORS.indigo_200,
  LUNCH: LABEL_COLORS.green_200,
  SNACK: LABEL_COLORS.red_200,
} as const;

export const DIFFICULTY_COLORS = {
  easy: LABEL_COLORS.green_500,
  medium: LABEL_COLORS.yellow_500,
  hard: LABEL_COLORS.orange_600,
  expert: LABEL_COLORS.red_600,
} as const;
