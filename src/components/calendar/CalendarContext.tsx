import type { RouterOutputs } from "@/src/utils/api";
import type { UserDailyDiet } from "@prisma/client";
import { type MealTypes } from "@prisma/client";
import { createContext } from "react";

type WeeklyCalendarContextType = {
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

export type MealTypeFilter = {
  key: string;
  name: "BREAKFAST" | "DINNER" | "LUNCH" | "SNACK";
  checked: boolean;
};

export const WeeklyCalendarContext = createContext<WeeklyCalendarContextType>(
  {} as WeeklyCalendarContextType
);

export type DietResult = RouterOutputs["diet"]["getUserDiet"];
export type DietQueryReturnType =
  | (UserDailyDiet & {
      recipe: {
        name: string;
      };
    })[]
  | undefined;

type CalendarContextType = {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  // smallCalendarMonth: number;
  // setSmallCalendarMonth: React.Dispatch<React.SetStateAction<number>>;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;

  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;

  dailyDietInfo: DietInfo | undefined;
  setDailyDiet: React.Dispatch<React.SetStateAction<DietInfo | undefined>>;
  onDietUpdate: () => void;

  filters: MealTypeFilter[];
  setFilters: React.Dispatch<React.SetStateAction<MealTypeFilter[]>>;

  monthlyDiet: DietQueryReturnType | undefined;
  setMonthlyDiet: React.Dispatch<
    React.SetStateAction<DietQueryReturnType | undefined>
  >;

  // showEventModal: boolean;
  // setShowEventModal: React.Dispatch<React.SetStateAction<string | null>>;
  // dispatchCalEvent: () => void; //({ type:string; payload: {}; }) => void;
  // savedEvents: [];
  // selectedEvent: null;
  // setSelectedEvent: React.Dispatch<React.SetStateAction<string | null>>;
  // setLabels: React.Dispatch<React.SetStateAction<string | null>>;
  // labels: string[];
  // updateLabel: React.Dispatch<React.SetStateAction<[]>>;
  // filteredEvents: [];
};

export const CalendarContext = createContext<CalendarContextType>(
  {} as CalendarContextType
);
