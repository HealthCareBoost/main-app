import { MealTypes } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Dialog } from "../ui/Dialog";
import type { DietInfo, MealTypeFilter } from "./CalendarContext";
import { CalendarContext } from "./CalendarContext";
import { CalendarHeader } from "./CalendarHeader";
import { GetMonthDays } from "@/src/utils/calendarUtils";
import { CalendarMonth } from "./Month";
import { CalendarDialog } from "./CalendarDialog";
import { CalendarSidebar } from "./CalendarSidebar";

export const Calendar: React.FC = () => {
  const [currenMonth, setCurrentMonth] = useState(GetMonthDays(new Date()));
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date>(currentDate);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dailyDietInfo, setDailyDiet] = useState<DietInfo | undefined>(
    undefined
  );

  const initial_filters: MealTypeFilter[] = Object.entries(MealTypes).map(
    ([key, val]) => ({
      key,
      name: val,
      checked: true,
    })
  );
  const [filters, setFilters] = useState<MealTypeFilter[]>(initial_filters);

  useEffect(() => {
    setCurrentMonth(GetMonthDays(currentDate));
  }, [currentDate]);

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        selectedDay,
        setSelectedDay,
        isDialogOpen,
        setIsDialogOpen,
        dailyDietInfo,
        setDailyDiet,
        onDietUpdate: () => {
          console.log("diet update");
        },
        filters,
        setFilters,
      }}
    >
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setDailyDiet(undefined);
          }
          setIsDialogOpen(open);
        }}
      >
        <div className="container mx-auto flex h-full w-full flex-col ">
          <CalendarHeader />
          <div className="flex flex-1">
            <CalendarSidebar />
            <CalendarMonth month={currenMonth} />
          </div>
        </div>
        <CalendarDialog />
      </Dialog>
    </CalendarContext.Provider>
  );
};
