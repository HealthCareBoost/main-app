export type GenerateRequestParams = {
  timeFrame?: "day" | "week";
  targetCalories?: number;
  diet?: string; //"vegetarian";
  exclude?: string; //"shellfish, olives";
};

export type mealResponce = {
  id: number;
  title: string;
  readyInMinutes: number;
  image: string;
  imageUrls: string[];
};

export type NutritionResponce = {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
};

export type GenarateMealResponce = {
  meals: mealResponce[];
  nutrients: NutritionResponce;
};

export type RecipeInfoResponce = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  lowFodmap: boolean;
  ketogenic: boolean;
  whole30: boolean;
  servings: number;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  aggregateLikes: number;
  creditText: string;
  sourceName: string;
  extendedIngredients: IngredientsInfo[];
  id: number;
  title: string;
  readyInMinutes: number;
  image: string;
  imageType: string;
  instructions: string;
  summary: string;
  cuisines: [];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  winePairing: { pairedWines: []; pairingText: ""; productMatches: [] };
  analyzedInstructions: [{ name: string; steps: string[] }];
  originalId: null;
};

type IngredientsInfo = {
  id: number;
  aisle: string;
  image: string;
  name: string;
  amount: number;
  unit: string;
  unitShort?: string;
  unitLong?: string;
  originalString: string;
  metaInformation: string[];
};
