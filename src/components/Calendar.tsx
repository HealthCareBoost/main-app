import React, { useEffect, useRef, useState } from "react";
import { startOfWeek, addDays, format, subWeeks, addWeeks } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/AlertDialog";
import { CalendarHeader } from "./calendar/Header";

const days = [
  { name: "Monday", short: "Mon" },
  { name: "Tuesday", short: "Tue" },
  { name: "Wednesday", short: "Wed" },
  { name: "Thursday", short: "Thu" },
  { name: "Friday", short: "Fri" },
  { name: "Saturday", short: "Sat" },
  { name: "Sunday", short: "Sun" },
];

export const Calendar: React.FC = () => {
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const todayRef = useRef<Date>(currentDate);
  // const weekRef = useRef<number>(getWeek(currentDate, { weekStartsOn: 1 }));

  useEffect(() => {
    console.log(currentDate);
    console.log(todayRef.current);
    console.log(todayRef.current === currentDate);

    const startOfCurrentWeek = startOfWeek(currentDate, {
      weekStartsOn: 1,
    });

    const currentWeekDays = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(startOfCurrentWeek, i);
      const formattedDate = format(date, "dd-MMMM-yyyy");
      currentWeekDays.push(formattedDate);
    }
    console.log(currentWeekDays);
    // console.log(currentWeekDays);
    setDaysOfWeek(currentWeekDays);
  }, [currentDate]);

  return (
    <div className="container mx-auto mt-10 h-screen">
      <div className="wrapper h-screen w-full rounded bg-white shadow">
        <CalendarHeader
          date={format(currentDate, "MMMM-yyyy")}
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
              {days.map(({ name, short }, idx) => (
                <th
                  key={`${name}${idx}`}
                  className="lg:w-30 md:w-30 h-10 w-10 border-r p-2 text-xs sm:w-20 xl:w-40 xl:text-sm"
                >
                  <span className="hidden sm:block md:block lg:block xl:block">
                    {name}
                  </span>
                  {format(todayRef.current, "dd-MMMM-yyyy") ===
                    daysOfWeek[idx] && <p>today</p>}
                  <span className="hidden sm:block md:block lg:block xl:block">
                    {daysOfWeek[idx] !== undefined
                      ? format(new Date(daysOfWeek[idx] as string), "dd")
                      : daysOfWeek[idx]}
                  </span>
                  <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                    {short}
                  </span>
                  <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
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
                daysOfWeek.map((day, idx) => (
                  <td
                    key={`${day}${idx}`}
                    className="lg:w-30 md:w-30 ease h-40 w-10 cursor-pointer overflow-auto border p-1 transition duration-500 hover:bg-gray-300 sm:w-20 xl:w-40"
                  >
                    <div className="lg:w-30 md:w-30 mx-auto flex h-40 w-10 flex-col overflow-hidden sm:w-full xl:w-40">
                      {/* <div className="top h-5 w-full"></div>
                      <div className="bottom h-30 w-full flex-grow cursor-pointer py-1"></div> */}
                    </div>
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
