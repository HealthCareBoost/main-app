import { z } from "zod";

export const ActivityLevel = {
  sedentary: "Sedentary",
  lightly: "Lightly Active",
  moderately: "Moderately Active",
  very: "Very Active",
  extremely: "Extremely Active",
} as const;

export const DietGoal = {
  lose: "Lose Weight",
  gain: "Gain Weight",
  maintain: "Maintain Weight",
  healthy: "Eat Healthy",
  //   buildMuscle: "Muscle building",
} as const;

export const Diets = {
  Balanced: "Balanced",
  Vegetarian: "Vegetarian",
  Vegan: "Vegan",
  Gluten: "Gluten Free",
  Ketogenic: "Ketogenic",
  Paleo: "Paleo",
} as const;

export const HealthProblems = {
  Alcohol: "Alcohol intolerance",
  Nut: "Peanuts intolerance",
  Lactose: "Lactose intolerance",
  Gluten: "Gluten intolerance",
  Diabetes: "Diabetes",
  Cholesterol: "Cholesterol",
} as const;

export const DietSchema = z.object({
  height: z.coerce.number().positive(),
  weight: z.coerce.number().positive().min(10),
  age: z.coerce.number().positive().min(11).max(120),
  goal: z.nativeEnum(DietGoal).default("Eat Healthy"),
  activityLevel: z.nativeEnum(ActivityLevel).default("Moderately Active"),
  healthProblemsDefault: z.nativeEnum(HealthProblems).optional(),
  healthProblemsAdditional: z.string().optional(),
  diet: z.nativeEnum(Diets).default("Balanced"),
});
