import React, { useEffect, useRef, useState } from "react";
import { startOfWeek, addDays, format, subWeeks, addWeeks } from "date-fns";

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

  useEffect(() => {
    const startOfCurrentWeek = startOfWeek(currentDate, {
      weekStartsOn: 1,
    });
    const currentWeekDays = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(startOfCurrentWeek, i);
      const formattedDate = format(date, "dd");
      currentWeekDays.push(formattedDate);
    }
    // console.log(currentWeekDays);
    setDaysOfWeek(currentWeekDays);
  }, [currentDate]);

  return (
    <div className="container mx-auto mt-10 h-screen">
      <div className="wrapper h-screen w-full rounded bg-white shadow">
        <div className="header flex justify-between border-b p-2">
          <span className="text-lg font-bold">
            {format(todayRef.current, "yyyy-MMMM")}
          </span>
          <div className="buttons">
            <button
              className="p-1"
              onClick={() => {
                // console.log(subWeeks(currentDate, 1));
                setCurrentDate(subWeeks(currentDate, 1));
                // console.log(currentDate);
              }}
            >
              <svg
                width="1em"
                fill="gray"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-left-circle"
                // fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fillRule="evenodd"
                  d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
                />
              </svg>
            </button>
            <button
              className="p-1"
              onClick={() => {
                // console.log(addWeeks(currentDate, 1));
                setCurrentDate(addWeeks(currentDate, 1));
                // console.log(currentDate);
              }}
            >
              <svg
                width="1em"
                fill="gray"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-right-circle"
                // fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
        </div>
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
                  {format(todayRef.current, "dd") === daysOfWeek[idx] && (
                    <p>today</p>
                  )}
                  <span className="hidden sm:block md:block lg:block xl:block">
                    {daysOfWeek[idx]}
                  </span>
                  <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                    {short}
                  </span>
                  <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                    {daysOfWeek[idx]}
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
    </div>
  );
};
