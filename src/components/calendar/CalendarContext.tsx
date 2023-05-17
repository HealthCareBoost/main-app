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
  daySelected: Date | null;
  setDaySelected: React.Dispatch<React.SetStateAction<Date | null>>;
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
  currentDate: new Date(),
  setCurrentDate: () => {
    console.log();
  },
  // smallCalendarMonth: 0,
  // setSmallCalendarMonth: () => {
  //   console.log();
  // },
  daySelected: null,
  setDaySelected: () => {
    console.log();
  },
  // showEventModal: false,
  // setShowEventModal: () => {
  //   console.log();
  // },
  // dispatchCalEvent: () => {
  //   console.log();
  // },
  // savedEvents: [],
  // selectedEvent: null,
  // setSelectedEvent: () => {
  //   console.log();
  // },
  // setLabels: () => {
  //   console.log();
  // },
  // labels: [],
  // updateLabel: () => {
  //   console.log();
  // },
  // filteredEvents: [],
});
