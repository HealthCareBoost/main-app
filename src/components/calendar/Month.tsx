import { labelColor, removeTimezoneOffset } from "@/utils/calendarUtils";
import { format } from "date-fns";
import React, { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import { ScrollArea } from "../ui/ScrollArea";

export const CalendarMonth: React.FC<{ month: Date[][] }> = ({ month }) => {
  const { setSelectedDay, setDailyDiet, setIsDialogOpen, monthlyDiet } =
    useContext(CalendarContext);
  const currentDay: (day: Date) => string = (day) => {
    return format(day, "dd-MMMM-yyyy") === format(new Date(), "dd-MMMM-yyyy")
      ? "bg-orange-500/80 dark:bg-orange-500 text-white dark:text-primaryDark rounded-full w-7"
      : "";
  };

  return (
    <div className="grid flex-1 grid-cols-7 grid-rows-5">
      {month.map((week, weekIdx) => (
        <React.Fragment key={weekIdx}>
          {week.map((day, dayIdx) => {
            if (monthlyDiet && monthlyDiet.length > 0) {
              return (
                <div
                  onClick={() => {
                    // console.log(day);
                    setDailyDiet(undefined);
                    setSelectedDay(new Date(day));
                    setIsDialogOpen(true);
                  }}
                  className="flex h-[120px] flex-col border border-[#dadce0]"
                  key={`${dayIdx}-${day.toString()}`}
                >
                  <div className="flex flex-col items-center">
                    {weekIdx === 0 && (
                      <p className="mt-1 text-base">{format(day, "EEE")}</p>
                    )}
                    <p
                      className={`py-1 pb-1 text-center text-base ${currentDay(
                        day,
                      )}`}
                    >
                      {format(day, "dd")}
                    </p>
                  </div>
                  <ScrollArea className="mb-1 cursor-pointer">
                    {monthlyDiet.map((dietInfo, idx) => {
                      let returnBody;
                      const columnDate = removeTimezoneOffset(new Date(day));

                      if (
                        dietInfo.date.toDateString() ==
                        columnDate.toDateString()
                      ) {
                        returnBody = (
                          <div
                            key={`${idx}-${day.toString()}`}
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // console.log("adsfg");
                              // console.log(dietInfo);
                              setDailyDiet(dietInfo);
                              setSelectedDay(new Date(day));
                              setIsDialogOpen(true);
                            }}
                            className={`mx-1 mb-1 w-full truncate rounded p-1 text-sm text-gray-600`}
                            style={{
                              backgroundColor: labelColor(dietInfo.meal_type),
                            }}
                          >
                            {dietInfo.recipe.name}
                            {/* {dietInfo.meal_type} */}
                          </div>
                        );
                      }
                      return returnBody;
                    })}
                  </ScrollArea>
                </div>
              );
            } else {
              return (
                <div
                  onClick={() => {
                    setDailyDiet(undefined);
                    setSelectedDay(new Date(day));
                    setIsDialogOpen(true);
                  }}
                  className="flex h-[120px] flex-col border border-[#dadce0]"
                  key={`${dayIdx}-${day.toString()}`}
                >
                  <div className="flex flex-col items-center">
                    {weekIdx === 0 && (
                      <p className="mt-1 text-base">{format(day, "EEE")}</p>
                    )}
                    <p
                      className={`py-1 pb-1 text-center text-base ${currentDay(
                        day,
                      )}`}
                    >
                      {format(day, "dd")}
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </React.Fragment>
      ))}
    </div>
  );
};
