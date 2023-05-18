import React, { useEffect, useRef, useState } from "react";
import { startOfWeek, addDays, format, subWeeks, addWeeks } from "date-fns";
import { CalendarHeader } from "./calendar/Header";
import { Dialog } from "./ui/Dialog";
import { CalendarDialog } from "./calendar/CalendarDialog";
import { api } from "../utils/api";
import { removeTimezoneOffset } from "../utils/formatTimezone";
import type { DietInfo } from "./calendar/CalendarContext";
import { CalendarContext } from "./calendar/CalendarContext";
import { WEEK_DAYS } from "../utils/constants";

export const Calendar: React.FC = () => {
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const todayRef = useRef<Date>(currentDate);
  // const weekRef = useRef<number>(getWeek(currentDate, { weekStartsOn: 1 }));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Date>(currentDate);
  const [dailyDietInfo, setDailyDiet] = useState<DietInfo | undefined>(
    undefined
  );

  const { data, refetch } = api.user.getUserWeeklyDiet.useQuery({
    from: removeTimezoneOffset(
      new Date(daysOfWeek[0] !== undefined ? daysOfWeek[0] : currentDate)
    ),
    to: removeTimezoneOffset(
      new Date(
        daysOfWeek[6] !== undefined ? daysOfWeek[6] : addWeeks(currentDate, 1)
      )
    ),
  });
  // console.log("data");
  // console.log(data);

  useEffect(() => {
    // console.log(currentDate);
    // console.log(todayRef.current);
    // console.log(todayRef.current === currentDate);

    const startOfCurrentWeek = startOfWeek(currentDate, {
      weekStartsOn: 1,
    });

    const currentWeekDays = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(startOfCurrentWeek, i);
      const formattedDate = format(date, "dd-MMMM-yyyy");
      currentWeekDays.push(formattedDate);
    }
    // console.log(currentWeekDays);
    // console.log(currentWeekDays);
    setDaysOfWeek(currentWeekDays);
  }, [currentDate]);

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        selectedDay,
        setSelectedDay,
        closeDialog: () => setIsOpen(false),
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onDietUpdate: async () => {
          await refetch();
        },
        dailyDietInfo,
        setDailyDiet,
      }}
    >
      <div className="container mx-auto mt-10 h-screen">
        <div className="wrapper mx-auto h-screen w-5/6 rounded bg-white shadow">
          <Dialog
            open={isOpen}
            onOpenChange={(open: boolean) => {
              if (!open) {
                setDailyDiet(undefined);
              }
              setIsOpen(open);
            }}
          >
            <CalendarHeader
              getNextWeek={() => {
                setCurrentDate(addWeeks(currentDate, 1));
              }}
              getPreviousWeek={() => {
                setCurrentDate(subWeeks(currentDate, 1));
              }}
            />
            <table className="h-full w-full">
              <thead>
                <tr>
                  {WEEK_DAYS.map(({ name, short }, idx) => (
                    <th
                      key={`${name}${idx}`}
                      className="lg:w-30 md:w-30 h-10 w-10 border-r p-2 text-xs sm:w-20 xl:w-40 xl:text-sm"
                    >
                      <span className="hidden sm:block">{name}</span>
                      {format(todayRef.current, "dd-MMMM-yyyy") ===
                        daysOfWeek[idx] && <p>today</p>}
                      <span className="hidden sm:block">
                        {daysOfWeek[idx] !== undefined
                          ? format(new Date(daysOfWeek[idx] as string), "dd")
                          : daysOfWeek[idx]}
                      </span>
                      <span className="block sm:hidden">{short}</span>
                      <span className="block sm:hidden">
                        {daysOfWeek[idx] !== undefined
                          ? format(new Date(daysOfWeek[idx] as string), "dd")
                          : daysOfWeek[idx]}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* <tr className="h-20 text-center">
              <td className="lg:w-30 md:w-30 ease h-40 w-10 cursor-pointer overflow-auto border p-1 transition duration-500 hover:bg-gray-300 sm:w-20 xl:w-40 ">
              <div className="lg:w-30 md:w-30 mx-auto flex h-40 w-10 flex-col overflow-hidden sm:w-full xl:w-40">
              <div className="top h-5 w-full">
              <span className="text-gray-500">1</span>
              </div>
              <div className="bottom h-30 w-full flex-grow cursor-pointer py-1">
              <div className="event mb-1 rounded bg-purple-400 p-1 text-sm text-white">
              <span className="event-name">Meeting</span>
              <span className="time">12:00~14:00</span>
              </div>
              <div className="event mb-1 rounded bg-purple-400 p-1 text-sm text-white">
              <span className="event-name">Meeting</span>
              <span className="time">18:00~20:00</span>
              </div>
              </div>
              </div>
              </td>
              <td className="lg:w-30 md:w-30 ease h-40 w-10 cursor-pointer overflow-auto border p-1 transition duration-500 hover:bg-gray-300 sm:w-20 xl:w-40">
              <div className="lg:w-30 md:w-30  mx-auto flex h-40 w-10 flex-col overflow-hidden sm:w-full xl:w-40">
              <div className="top h-5 w-full">
              <span className="text-gray-500">2</span>
              </div>
              <div className="bottom h-30 w-full flex-grow cursor-pointer py-1"></div>
              </div>
              </td>
              <td className="lg:w-30 md:w-30 ease h-40 w-10 cursor-pointer overflow-auto border p-1 transition duration-500 hover:bg-gray-300 sm:w-20 xl:w-40">
              <div className="lg:w-30 md:w-30  mx-auto flex h-40 w-10 flex-col overflow-hidden sm:w-full xl:w-40">
              <div className="top h-5 w-full">
              <span className="text-gray-500">3</span>
              </div>
              <div className="bottom h-30 w-full flex-grow cursor-pointer py-1"></div>
              </div>
              </td>
              <td className="lg:w-30 md:w-30 ease h-40 w-10 cursor-pointer overflow-auto border p-1 transition duration-500 hover:bg-gray-300 sm:w-20 xl:w-40">
              <div className="lg:w-30 md:w-30  mx-auto flex h-40 w-10 flex-col overflow-hidden sm:w-full xl:w-40">
              <div className="top h-5 w-full">
              <span className="text-gray-500">4</span>
              </div>
              <div className="bottom h-30 w-full flex-grow cursor-pointer py-1"></div>
              </div>
              </td>
              <td className="lg:w-30 md:w-30 ease h-40 w-10 cursor-pointer overflow-auto border p-1 transition duration-500 hover:bg-gray-300 sm:w-20 xl:w-40">
              <div className="lg:w-30 md:w-30  mx-auto flex h-40 w-10 flex-col overflow-hidden sm:w-full xl:w-40">
              <div className="top h-5 w-full">
              <span className="text-gray-500">6</span>
              </div>
              <div className="bottom h-30 w-full flex-grow cursor-pointer py-1"></div>
              </div>
              </td>
              <td className="lg:w-30 md:w-30 ease h-40 w-10 cursor-pointer overflow-hidden border p-1 transition duration-500 hover:bg-gray-300 sm:w-20 xl:w-40">
              <div className="lg:w-30 md:w-30 mx-auto flex h-40 w-10 flex-col overflow-hidden sm:w-full xl:w-40">
              <div className="top h-5 w-full">
              <span className="text-gray-500">7</span>
              </div>
              <div className="bottom h-30 w-full flex-grow cursor-pointer py-1">
              <div className="event mb-1 rounded bg-blue-400 p-1 text-sm text-white">
              <span className="event-name">Shopping</span>
              <span className="time">12:00~14:00</span>
              </div>
              </div>
              </div>
              </td>
              <td className="lg:w-30 md:w-30 ease h-40 w-10 cursor-pointer overflow-auto border p-1 transition duration-500 hover:bg-gray-300 sm:w-20 xl:w-40">
              <div className="lg:w-30 md:w-30  mx-auto flex h-40 w-10 flex-col overflow-hidden sm:w-full xl:w-40">
              <div className="top h-5 w-full">
              <span className="text-sm text-gray-500">8</span>
              </div>
              <div className="bottom h-30 w-full flex-grow cursor-pointer py-1"></div>
              </div>
              </td>
            </tr> */}

                <tr className="h-full text-center">
                  {daysOfWeek.length > 0 &&
                    daysOfWeek.map((day, idx) => {
                      if (data !== undefined && data.length > 0) {
                        return (
                          <td
                            key={`${day}${idx}`}
                            onClick={() => {
                              // console.log(day);
                              setDailyDiet(undefined);
                              setSelectedDay(new Date(day));
                              setIsOpen(true);
                            }}
                            className="
                          lg:w-30 md:w-30 ease
                          h-40 w-10 cursor-pointer overflow-auto border-2 border-solid p-1 transition duration-500 hover:bg-gray-300 sm:w-20 xl:w-40"
                          >
                            {data.map((dailyDietInfo) => {
                              let returnBody;
                              const columnDate = removeTimezoneOffset(
                                new Date(day)
                              );
                              // console.log(dailyDietInfo.date.toDateString());
                              // // // console.log(day);
                              // console.log(columnDate);
                              // console.log(
                              //   dailyDietInfo.date.toDateString() ==
                              //     columnDate.toDateString()
                              // );
                              if (
                                dailyDietInfo.date.toDateString() ==
                                columnDate.toDateString()
                              ) {
                                returnBody = (
                                  <div
                                    key={`${dailyDietInfo.meal_type}${idx}`}
                                    className=" lg:w-30 md:w-30 mx-auto flex h-40 w-10 flex-col overflow-hidden border-solid sm:w-full xl:w-40"
                                  >
                                    <div
                                      className="
                                    event mb-1 rounded
                                    bg-purple-400 p-1 text-sm text-white"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        // console.log("open");
                                        // console.log(dailyDietInfo);
                                        setDailyDiet(dailyDietInfo);
                                        setIsOpen(true);
                                      }}
                                    >
                                      <div className="event-name">
                                        {dailyDietInfo.recipe.name}
                                      </div>
                                      <div className="meal-type">
                                        {dailyDietInfo.meal_type}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              //  else {
                              //   returnBody = (
                              //     <Dialog
                              //       key={`${dailyDietInfo.meal_type}${idx}`}
                              //       // open={isOpen}
                              //       // onOpenChange={(open: boolean) => {
                              //       //   setIsOpen(open);
                              //       // }}
                              //     >
                              //       <DialogTrigger asChild>
                              //         <div>click</div>
                              //       </DialogTrigger>
                              //       <CalendarDialog
                              //         selectedDate={removeTimezoneOffset(
                              //           new Date(day)
                              //         )}
                              //       />
                              //     </Dialog>
                              //   );
                              // }
                              return returnBody;
                            })}
                          </td>
                        );
                      } else {
                        return (
                          <td
                            key={`${day}${idx}`}
                            onClick={() => {
                              // console.log(day);
                              setDailyDiet(undefined);
                              setSelectedDay(new Date(day));
                              setIsOpen(true);
                            }}
                            className="lg:w-30 md:w-30 ease h-40 w-10 cursor-pointer overflow-auto border-2 border-solid p-1 transition duration-500 hover:bg-gray-300 sm:w-20 xl:w-40"
                          ></td>
                        );
                      }
                    })}
                </tr>
              </tbody>
            </table>

            <CalendarDialog />
          </Dialog>
        </div>
      </div>
    </CalendarContext.Provider>
  );
};
