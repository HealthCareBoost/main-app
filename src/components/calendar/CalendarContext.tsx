import { type MealTypes } from "@prisma/client";
import { createContext } from "react";

type CalendarContextType = {
  currentDate: Date;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  closeDialog: () => void;
  onDietUpdate: () => void;
  dailyDietInfo: DietInfo | undefined;
  setDailyDiet: React.Dispatch<React.SetStateAction<DietInfo | undefined>>;
};

export type DietInfo = {
  date: Date;
  recipe_id: string;
  recipe: {
    name: string;
  };
  user_id: string;
  meal_type: MealTypes;
};

export const CalendarContext = createContext<CalendarContextType>(
  {} as CalendarContextType
);
