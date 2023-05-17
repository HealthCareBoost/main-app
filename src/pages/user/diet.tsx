import { type NextPage } from "next";
import Layout from "../../components/Layout";
import {
  getYear,
  getMonth,
  getDate,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GlobalContext } from "../../components/calendar/CalendarContext";
import { Calendar } from "../../components/ui/Calendar";
import { WEEK_DAYS } from "../../utils/constants";

const GetMonthDays = (date: Date) => {
  // month = Math.floor(month);
  // const year = dayjs().year();
  // const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  // let currentMonthCount = 0 - firstDayOfTheMonth;
  // const daysMatrix = new Array(5).fill([]).map(() => {
  //   return new Array(7).fill(null).map(() => {
  //     currentMonthCount++;
  //     return dayjs(new Date(year, month, currentMonthCount));
  //   });
  // });
  // return daysMatrix;

  const year = getYear(date);
  // console.log(year);
  const month = getMonth(date);
  // console.log(month);
  // console.log(Math.floor(month));
  const firstDayOfTheMonth = getDate(new Date(year, month, 1));
  let currentMonthCount = 0 - firstDayOfTheMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return new Date(year, month, currentMonthCount);
    });
  });
  return daysMatrix;
};

const UserDiet: NextPage = () => {
  // console.table(GetMonthDays(new Date()));
  const [currenMonth, setCurrentMonth] = useState(GetMonthDays(new Date()));
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [daySelected, setDaySelected] = useState<Date | null>(new Date());

  useEffect(() => {
    console.log("setCurrentDate uwU");
    setCurrentMonth(GetMonthDays(currentDate));
  }, [currentDate]);

  return (
    <Layout>
      <GlobalContext.Provider
        value={{ currentDate, setCurrentDate, daySelected, setDaySelected }}
      >
        <div className="flex h-screen w-full flex-col">
          <CalendarHeader />
          <div className="flex flex-1">
            <CalendarSidebar />
            <CalendarMonth month={currenMonth} />
          </div>
        </div>
      </GlobalContext.Provider>
    </Layout>
  );
};

export default UserDiet;

const CalendarHeader: React.FC = () => {
  const { currentDate, setCurrentDate } = useContext(GlobalContext);
  return (
    <header className="flex items-center px-4 py-2">
      <Button
        onClick={() => {
          setCurrentDate(new Date());
        }}
      >
        Today
      </Button>
      <ChevronLeft
        onClick={() => {
          setCurrentDate((prev) => subMonths(prev, 1));
        }}
      />
      <ChevronRight
        onClick={() => {
          setCurrentDate((prev) => addMonths(prev, 1));
        }}
      />
      <div>{format(currentDate, "MMMM yyyy")}</div>
    </header>
  );
};

const CalendarSidebar: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [currenMonth, setCurrentMonth] = useState(GetMonthDays(new Date()));

  const { currentDate, setCurrentDate, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    console.log("setCurrentDate uwU");
    setCurrentMonth(GetMonthDays(currentDate));
  }, [currentDate]);

  useEffect(() => {
    setCurrentDate(currentDate);
  }, [currentDate, setCurrentDate]);

  function getDayClass(day: Date): string {
    const date_format = "dd-MMMM-yyyy";
    const today = format(new Date(), date_format);
    const currDay = format(day, date_format);
    const slcDay = daySelected && format(daySelected, date_format);

    if (today === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }

  return (
    <aside>
      <Button>Create event</Button>
      <Calendar
        mode="single"
        selected={currentDate}
        onSelect={(day) => {
          console.log(day);
          setCurrentDate((prev) => (day ? day : prev));
        }}
        className="rounded-md border"
      />
      <div className="mt-9">
        <header className="flex justify-between">
          <p className="font-bold text-gray-500">
            {format(currentDate, "MMMM yyyy")}
          </p>
          <div>
            <ChevronLeft
              onClick={() => {
                setCurrentDate((prev) => subMonths(prev, 1));
              }}
            />
            <ChevronRight
              onClick={() => {
                setCurrentDate((prev) => addMonths(prev, 1));
              }}
            />
          </div>
        </header>
        <div className="grid grid-cols-7 grid-rows-6">
          {WEEK_DAYS.map((day) => (
            <span key={day.name} className="py-1 text-center text-sm">
              {day.short}
            </span>
          ))}
          {currenMonth.map((week, i) => (
            <React.Fragment key={i}>
              {week.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDaySelected(day);
                  }}
                  className={`w-full py-1 ${getDayClass(day)}`}
                >
                  <span className="text-sm">{format(day, "d")}</span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </aside>
  );
};

const CalendarMonth: React.FC<{ month: Date[][] }> = ({ month }) => {
  const {} = useContext(GlobalContext);
  const currentDay: (day: Date) => string = (day) => {
    return format(day, "dd-MMMM-yyyy") === format(new Date(), "dd-MMMM-yyyy")
      ? "bg-orange-400 text-primaryDark rounded-full w-7"
      : "";
  };

  return (
    <div className="grid flex-1 grid-cols-7 grid-rows-5">
      {month.map((week, i) => (
        <React.Fragment key={i}>
          {week.map((day, idx) => (
            <div
              className="flex flex-col border border-slate-400"
              key={`${idx}-${day.toString()}`}
            >
              <div className="flex flex-col items-center">
                {i === 0 && (
                  <p className="mt-1 text-base">{format(day, "EEEE")}</p>
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
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
