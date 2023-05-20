import React, { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { api } from "@/src/utils/api";
import { labelColor, removeTimezoneOffset } from "@/src/utils/calendarUtils";

export const CalendarMonth: React.FC<{ month: Date[][] }> = ({ month }) => {
  const {
    setSelectedDay,
    setDailyDiet,
    setIsDialogOpen,
    currentDate,
    filters,
  } = useContext(CalendarContext);
  const currentDay: (day: Date) => string = (day) => {
    return format(day, "dd-MMMM-yyyy") === format(new Date(), "dd-MMMM-yyyy")
      ? "bg-orange-400 text-primaryDark rounded-full w-7"
      : "";
  };

  const { data } = api.user.getUserWeeklyDiet.useQuery({
    from: removeTimezoneOffset(startOfMonth(currentDate)),
    to: removeTimezoneOffset(endOfMonth(currentDate)),
    filters: filters,
  });
  //   console.log(data);

  return (
    <div className="grid flex-1 grid-cols-7 grid-rows-5">
      {month.map((week, weekIdx) => (
        <React.Fragment key={weekIdx}>
          {week.map((day, dayIdx) => {
            if (data && data.length > 0) {
              return (
                <div
                  onClick={() => {
                    // console.log(day);
                    setDailyDiet(undefined);
                    setSelectedDay(new Date(day));
                    setIsDialogOpen(true);
                  }}
                  className="flex flex-col border border-[#dadce0]"
                  key={`${dayIdx}-${day.toString()}`}
                >
                  <div className="flex flex-col items-center">
                    {weekIdx === 0 && (
                      <p className="mt-1 text-base">{format(day, "EEE")}</p>
                    )}
                    <p
                      className={`my-1 p-1 text-center text-base ${currentDay(
                        day
                      )}`}
                    >
                      {format(day, "dd")}
                    </p>
                  </div>
                  <div className="flex-1 cursor-pointer">
                    {data.map((dailyDietInfo, idx) => {
                      let returnBody;
                      const columnDate = removeTimezoneOffset(new Date(day));

                      if (
                        dailyDietInfo.date.toDateString() ==
                        columnDate.toDateString()
                      ) {
                        returnBody = (
                          <div
                            key={`${idx}-${day.toString()}`}
                            onClick={() => setDailyDiet(dailyDietInfo)}
                            className={`event mx-1  mb-1 truncate rounded p-1 text-sm text-gray-600`}
                            style={{
                              backgroundColor: labelColor(
                                dailyDietInfo.meal_type
                              ),
                            }}
                          >
                            {dailyDietInfo.recipe.name}
                            {/* {dailyDietInfo.meal_type} */}
                          </div>
                        );
                      }
                      return returnBody;
                    })}
                  </div>
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
                  className="flex flex-col border border-[#dadce0]"
                  key={`${dayIdx}-${day.toString()}`}
                >
                  <div className="flex flex-col items-center">
                    {weekIdx === 0 && (
                      <>
                        <p className="mt-1 hidden text-base sm:block">
                          {format(day, "EEEE")}
                        </p>
                        <p className="blocktext-base mt-1 sm:hidden">
                          {format(day, "EE")}
                        </p>
                      </>
                    )}
                    <p
                      className={`my-1 p-1 text-center text-base ${currentDay(
                        day
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
