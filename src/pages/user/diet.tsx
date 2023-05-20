import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/Dialog";
import { Input } from "@/src/components/ui/FormInput";
import { Form } from "@/src/components/ui/FormProvider";
import { FormSelect } from "@/src/components/ui/FormSelect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/Popover";
import { useZodForm } from "@/src/hooks/useZodFormHook";
import { api } from "@/src/utils/api";
import { removeTimezoneOffset } from "@/src/utils/formatTimezone";
import { MealTypes } from "@prisma/client";
import {
  addMonths,
  endOfMonth,
  format,
  getDay,
  getMonth,
  getYear,
  startOfMonth,
  subMonths,
} from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { type NextPage } from "next";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { z } from "zod";
import Layout from "../../components/Layout";
import type {
  DietInfo,
  MealTypeFilter,
} from "../../components/calendar/CalendarContext";
import { GlobalContext } from "../../components/calendar/CalendarContext";
import { Button } from "../../components/ui/Button";
import { Calendar } from "../../components/ui/Calendar";
import { Separator } from "@/src/components/ui/Separator";
import { LABEL_COLORS, MEAL_TYPE_COLORS } from "@/src/utils/enumsMap";
import { cn } from "@/src/utils/cn";
import { Checkbox } from "@/src/components/ui/Checkbox";

const labelColor: (type: MealTypes) => string = (meal_type) => {
  return MEAL_TYPE_COLORS[meal_type]
    ? MEAL_TYPE_COLORS[meal_type]
    : LABEL_COLORS.yellow;
};

const GetMonthDays = (date: Date) => {
  const year = getYear(date);
  const month = getMonth(date);
  // set first day to monday
  const firstDayOfTheMonth = getDay(new Date(year, month, 1)) - 1;
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
  const [currenMonth, setCurrentMonth] = useState(GetMonthDays(new Date()));
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date>(currentDate);
  const todayRef = useRef<Date>(currentDate);
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
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <header className="mb-4 flex items-center justify-end border border-red-500 px-4 py-2 sm:mb-0">
      <Button
        onClick={() => {
          setCurrentDate(new Date());
        }}
      >
        Today
      </Button>
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
            selected={date}
            onSelect={(day) => {
              // console.log(day);
              setDate(date);
              setCurrentDate((prev) => (day ? day : prev));
            }}
            className="rounded-md border p-1"
          />
        </PopoverContent>
      </Popover>

      <Separator className={"inline"} orientation={"vertical"} />
      <ChevronLeft
        onClick={() => {
          setCurrentDate((prev) => subMonths(prev, 1));
        }}
      />
      <div>{format(currentDate, "MMMM yyyy")}</div>
      <ChevronRight
        onClick={() => {
          setCurrentDate((prev) => addMonths(prev, 1));
        }}
      />
    </header>
  );
};

const CalendarSidebar: React.FC = () => {
  const [currenMonth, setCurrentMonth] = useState(GetMonthDays(new Date()));

  const { currentDate, setCurrentDate, setSelectedDay, selectedDay } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(GetMonthDays(currentDate));
  }, [currentDate]);

  useEffect(() => {
    setCurrentDate(currentDate);
  }, [currentDate, setCurrentDate]);

  return (
    <aside className="hidden sm:col-span-3 sm:block">
      <Dialog>
        <div className="my-2">
          <Button
            className="mx-2 flex-1 p-1"
            onClick={() => {
              console.log("Generate diet");
            }}
            variant="default"
          >
            Autogenerate
          </Button>
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
        </div>
        <NewCalendarDialog />
      </Dialog>
      <Calendar
        mode="single"
        selected={currentDate}
        onSelect={(day) => {
          console.log(day);
          setCurrentDate((prev) => (day ? day : prev));
        }}
        className="m-0 mx-auto hidden rounded-md border sm:block"
      />

      <Filters />
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
  const {
    setSelectedDay,
    setDailyDiet,
    setIsDialogOpen,
    dailyDietInfo,
    currentDate,
    filters,
  } = useContext(GlobalContext);
  const currentDay: (day: Date) => string = (day) => {
    return format(day, "dd-MMMM-yyyy") === format(new Date(), "dd-MMMM-yyyy")
      ? "bg-orange-400 text-primaryDark rounded-full w-7"
      : "";
  };

  const { data, refetch } = api.user.getUserWeeklyDiet.useQuery({
    from: removeTimezoneOffset(startOfMonth(currentDate)),
    to: removeTimezoneOffset(endOfMonth(currentDate)),
    filters: filters,
  });

  console.log(data);

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
                      <>
                        <p className="mt-1 hidden text-base sm:block">
                          {format(day, "EEEE")}
                        </p>
                        <p className="mt-1 block text-base sm:hidden">
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
                            {dailyDietInfo.recipe.name} -{" "}
                            {dailyDietInfo.meal_type}
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
                  className="flex flex-col border border-slate-400"
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

  const router = useRouter();

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
      await updateDiet.mutateAsync(
        {
          date: removeTimezoneOffset(
            new Date(dailyDietInfo.date.toDateString())
          ),
          meal_type: data.meal_type,
          previous_recipe_id: dailyDietInfo.recipe_id,
          new_recipe_id: "clhen81uk0007uyksrz8k5u38",
        },
        {
          onSuccess: () => {
            router.refresh();
          },
        }
      );
    } else {
      await saveDiet.mutateAsync(
        {
          date: removeTimezoneOffset(new Date(selectedDay.toDateString())),
          meal_type: data.meal_type,
          recipe_id: "clhen81uk0007uyksrz8k5u38",
        },
        {
          onSuccess: () => {
            router.refresh();
            // router.push(`/recipe/${recipe_id}#comment`);
          },
        }
      );
    }
    setDailyDiet(undefined);
    onDietUpdate();
    setIsDialogOpen(false);
    router.refresh();
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
    router.refresh();
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
              <>{dailyDietInfo ? dailyDietInfo.recipe.name : "no name"}</>
              <Input
                type="text"
                label="Recipe"
                className="col-span-3"
                required
                {...form.register("recipe_name")}
              ></Input>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <>{dailyDietInfo ? dailyDietInfo.meal_type : "no meal_typx"}</>
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
        {dailyDietInfo !== undefined && (
          <Button onClick={() => void onDeleteClick()}>Delete</Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
};

const Filters: React.FC = () => {
  const { filters, setFilters } = useContext(GlobalContext);

  useEffect(() => {
    console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
    console.log(filters);
    console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
  }, [filters]);

  return (
    <React.Fragment>
      <p className="mt-10 font-bold text-gray-500">Filters</p>
      {filters.map(({ key, checked, name }, idx) => (
        <label key={`${idx}${key}`} className="mt-3 flex items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              setFilters((prev) => {
                return prev.map((prevFilter) => {
                  if (prevFilter.name === name) {
                    return { key, name, checked: !checked };
                  }
                  return prevFilter;
                });
              });
              // updateLabel({ label: lbl, checked: !checked })
              // setLabelState((prev) => {...prev,  SNACK: !prev["name"]})
              console.log("toggle");
            }}
            className={`form-checkbox h-5 w-5 cursor-pointer rounded focus:ring-0`}
            style={{ accentColor: labelColor(name), color: labelColor(name) }}
          />
          <span className="ml-2 capitalize text-gray-700">{name}</span>
        </label>
      ))}
    </React.Fragment>
  );
};
