import { getDay, getMonth, getYear } from "date-fns";
import { Constants } from "./constants";
import type { MealTypes } from "@prisma/client";
import { LABEL_COLORS, MEAL_TYPE_COLORS } from "./enumsMap";

export const GetMonthDays = (date: Date) => {
  const year = getYear(date);
  const month = getMonth(date);
  // set first day to monday
  const firstDayOfTheMonth = getDay(new Date(year, month, 1)) - 1;
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(Constants.MONTH_WEEKS).fill([]).map(() => {
    return new Array(Constants.DAYS_WEEK).fill(null).map(() => {
      currentMonthCount++;
      return new Date(year, month, currentMonthCount);
    });
  });
  return daysMatrix;
};

export const labelColor: (type: MealTypes) => string = (meal_type) => {
  return MEAL_TYPE_COLORS[meal_type]
    ? MEAL_TYPE_COLORS[meal_type]
    : LABEL_COLORS.yellow_200;
};

export const removeTimezoneOffset: (date: Date) => Date = (date) => {
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset);
};
