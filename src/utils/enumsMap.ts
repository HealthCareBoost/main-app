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
