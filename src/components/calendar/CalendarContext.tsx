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

type GlobalContextType = {
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

export const GlobalContext = createContext<GlobalContextType>({
  // currentDate: new Date(),
  // setCurrentDate: () => {
  //   console.log();
  // },
  // isDialogOpen: false,
  // setIsDialogOpen: () => {
  //   console.log();
  // },
  // dailyDietInfo: undefined,
  // onDietUpdate: () => {
  //   console.log();
  // },
  // setDailyDiet: () => {
  //   console.log();
  // },
  // selectedDay: new Date(),
  // setSelectedDay: () => {
  //   console.log();
  // },
} as GlobalContextType);
