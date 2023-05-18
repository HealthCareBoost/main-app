import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/Popover";
import {
  addMonths,
  format,
  getDate,
  getMonth,
  getYear,
  subMonths,
} from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { type NextPage } from "next";
import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import type { DietInfo } from "../../components/calendar/CalendarContext";
import { GlobalContext } from "../../components/calendar/CalendarContext";
import { Button } from "../../components/ui/Button";
import { Calendar } from "../../components/ui/Calendar";
import { removeTimezoneOffset } from "@/src/utils/formatTimezone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/Dialog";
import { api } from "@/src/utils/api";
import { useZodForm } from "@/src/hooks/useZodFormHook";
import { z } from "zod";
import { MealTypes } from "@prisma/client";
import { Form } from "@/src/components/ui/FormProvider";
import { Input } from "@/src/components/ui/FormInput";
import { FormSelect } from "@/src/components/ui/FormSelect";

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

const getLimit = (monthDays: Date[][], type: "start" | "end") => {
  if (type === "start") {
    const firstArr = monthDays.shift();
    return firstArr ? firstArr.shift() : new Date();
  }

  if (type === "end") {
    const lastArr = monthDays.pop();
    return lastArr ? lastArr.pop() : subMonths(new Date(), 1);
  }

  return new Date();
};

const UserDiet: NextPage = () => {
  // console.log(GetMonthDays(new Date()));
  const [currenMonth, setCurrentMonth] = useState(GetMonthDays(new Date()));
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date>(currentDate);
  const todayRef = useRef<Date>(currentDate);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dailyDietInfo, setDailyDiet] = useState<DietInfo | undefined>(
    undefined
  );

  const { data, refetch } = api.user.getUserWeeklyDiet.useQuery({
    from: removeTimezoneOffset(new Date(2023, 4, 30)),
    to: removeTimezoneOffset(new Date(2023, 6, 3)),
  });
  console.log(currenMonth);

  useEffect(() => {
    setCurrentMonth(GetMonthDays(currentDate));
  }, [currentDate]);

  return (
    <Layout>
      <GlobalContext.Provider
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
          <div className="container mx-auto mt-10 flex h-screen w-full flex-col ">
            <CalendarHeader />
            <div className="flex flex-1">
              <CalendarSidebar />
              <CalendarMonth month={currenMonth} />
            </div>
          </div>
          <NewCalendarDialog />
        </Dialog>
      </GlobalContext.Provider>
    </Layout>
  );
};

export default UserDiet;

const CalendarHeader: React.FC = () => {
  const { currentDate, setCurrentDate, setSelectedDay } =
    useContext(GlobalContext);
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

  const { currentDate, setCurrentDate, setSelectedDay, selectedDay } =
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
    const slcDay = selectedDay && format(selectedDay, date_format);

    if (today === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }

  return (
    <aside className="hidden sm:col-span-3 sm:block">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="mx-2 flex-1 p-1"
            onClick={() => {
              setSelectedDay(removeTimezoneOffset(new Date()));
            }}
            variant="default"
          >
            Set meal for today
          </Button>
        </DialogTrigger>
        <NewCalendarDialog />
      </Dialog>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="block sm:hidden">
            <CalendarDays className="h-4 w-4" />
            <span className="sr-only">Open calendar</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="">
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={(day) => {
              console.log(day);
              setCurrentDate((prev) => (day ? day : prev));
            }}
            className="rounded-md border p-1"
          />
        </PopoverContent>
      </Popover>

      <Calendar
        mode="single"
        selected={currentDate}
        onSelect={(day) => {
          console.log(day);
          setCurrentDate((prev) => (day ? day : prev));
        }}
        className="-ml-4 mr-2 hidden rounded-md border sm:block"
      />
      {/* <div className="mt-9">
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
                    setSelectedDay(day);
                  }}
                  className={`w-full py-1 ${getDayClass(day)}`}
                >
                  <span className="text-sm">{format(day, "d")}</span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div> */}
    </aside>
  );
};

const CalendarMonth: React.FC<{ month: Date[][] }> = ({ month }) => {
  const { setSelectedDay, setDailyDiet, setIsDialogOpen } =
    useContext(GlobalContext);
  const currentDay: (day: Date) => string = (day) => {
    return format(day, "dd-MMMM-yyyy") === format(new Date(), "dd-MMMM-yyyy")
      ? "bg-orange-400 text-primaryDark rounded-full w-7"
      : "";
  };

  return (
    <div className="grid flex-1 grid-cols-7 grid-rows-5 ss:col-span-7">
      {month.map((week, i) => (
        <React.Fragment key={i}>
          {week.map((day, idx) => (
            <div
              onClick={() => {
                // console.log(day);
                setDailyDiet(undefined);
                setSelectedDay(new Date(day));
                setIsDialogOpen(true);
              }}
              className="flex flex-col border border-slate-400"
              key={`${idx}-${day.toString()}`}
            >
              <div className="flex flex-col items-center">
                {i === 0 && (
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
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

const NewCalendarDialog: React.FC = () => {
  const {
    currentDate,
    selectedDay,
    setCurrentDate,
    setSelectedDay,
    setDailyDiet,
    onDietUpdate,
    setIsDialogOpen,
    dailyDietInfo,
  } = useContext(GlobalContext);

  const saveDiet = api.user.saveUserDailyDiet.useMutation();
  const updateDiet = api.user.updateUserDailyDiet.useMutation();
  const deleteMutation = api.user.deleteDiet.useMutation();

  const form = useZodForm({
    schema: z.object({
      recipe_name: z.string(),
      meal_type: z.nativeEnum(MealTypes),
    }),
    defaultValues: {
      meal_type:
        dailyDietInfo !== undefined ? dailyDietInfo.meal_type : "BREAKFAST",
      recipe_name: dailyDietInfo !== undefined ? dailyDietInfo.recipe.name : "",
    },
  });

  useEffect(() => {
    if (dailyDietInfo !== undefined) {
      form.setValue("meal_type", dailyDietInfo.meal_type);
      form.setValue("recipe_name", dailyDietInfo.recipe.name);
    } else {
      form.setValue("meal_type", MealTypes.BREAKFAST);
      form.setValue("recipe_name", "");
    }
  }, [dailyDietInfo, form]);

  const onFormSubmit = async (data: {
    meal_type: "BREAKFAST" | "DINNER" | "LUNCH" | "SNACK";
    recipe_name: string;
  }) => {
    console.log("***** form data *****");
    console.log(data);
    console.log("***** daily data *****");
    // console.log(dailyDietInfo);
    console.log("***** data *****");
    if (
      dailyDietInfo !== undefined &&
      dailyDietInfo.recipe_id &&
      dailyDietInfo.date
    ) {
      await updateDiet.mutateAsync({
        date: removeTimezoneOffset(new Date(dailyDietInfo.date.toDateString())),
        meal_type: data.meal_type,
        previous_recipe_id: dailyDietInfo.recipe_id,
        new_recipe_id: "clhen81uk0007uyksrz8k5u38",
      });
    } else {
      await saveDiet.mutateAsync({
        date: removeTimezoneOffset(new Date(selectedDay.toDateString())),
        meal_type: data.meal_type,
        recipe_id: "clhen81uk0007uyksrz8k5u38",
      });
    }
    setDailyDiet(undefined);
    onDietUpdate();
    setIsDialogOpen(false);
  };

  const onDeleteClick = async () => {
    console.log("delete");
    if (
      dailyDietInfo !== undefined &&
      dailyDietInfo.recipe_id &&
      dailyDietInfo.date
    ) {
      await deleteMutation.mutateAsync({
        date: removeTimezoneOffset(new Date(dailyDietInfo.date.toDateString())),
        meal_type: dailyDietInfo.meal_type,
        recipe_id: dailyDietInfo.recipe_id,
      });
    }
    setDailyDiet(undefined);
    onDietUpdate();
    setIsDialogOpen(false);
  };

  return (
    <DialogContent forceMount={true} className="sm:max-w-[425px]">
      <DialogHeader>
        {selectedDay && (
          <DialogTitle>{format(selectedDay, "eeee, dd MMMM")}</DialogTitle>
        )}
        <DialogDescription>
          Add daily meal and click save when you&apos;re done.
        </DialogDescription>
        <Form form={form} onSubmit={onFormSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <>{dailyDietInfo ? dailyDietInfo.recipe.name : "no name"}</> */}
              <Input
                type="text"
                label="Recipe"
                className="col-span-3"
                required
                {...form.register("recipe_name")}
              ></Input>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <>{dailyDietInfo ? dailyDietInfo.meal_type : "no meal_typx"}</> */}
              <FormSelect
                className="col-span-3"
                label="For"
                required
                {...form.register("meal_type")}
              >
                {Object.entries(MealTypes).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </FormSelect>
            </div>
          </div>
          <Button type="submit">Save</Button>
        </Form>
      </DialogHeader>
      <DialogFooter>
        {/* {dailyDietInfo !== undefined && ( */}
        <Button onClick={() => void onDeleteClick()}>Delete</Button>
        {/* )} */}
      </DialogFooter>
    </DialogContent>
  );
};
