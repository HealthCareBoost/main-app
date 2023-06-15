import { labelColor, removeTimezoneOffset } from "@/src/utils/calendarUtils";
import React, { useContext } from "react";
import { Button } from "../ui/Button";
import { Calendar } from "../ui/Calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { CalendarContext } from "./CalendarContext";
import { CalendarDialog } from "./CalendarDialog";
import { format } from "date-fns";
import { CreateDietForm } from "../diet/CreatDietForm";

export const CalendarSidebar: React.FC = () => {
  const { setCurrentDate, setSelectedDay } = useContext(CalendarContext);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <aside className="hidden sm:col-span-3 sm:block">
      <div className="my-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="mx-2 flex-1 p-1"
              onClick={() => {
                console.log("Generate diet");
              }}
              variant="default"
            >
              Autogenerate
            </Button>
          </DialogTrigger>
          <DialogContent
            forceMount={true}
            className="flex flex-col items-center sm:max-w-lg"
          >
            <DialogHeader className="self-center">
              <DialogTitle className="text-center">
                {format(new Date(), "eeee, dd MMMM")}
              </DialogTitle>
              <DialogDescription className="text-center">
                Autogenerate your daily meal plan.
              </DialogDescription>
            </DialogHeader>
            <CreateDietForm />
          </DialogContent>
        </Dialog>
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
          <CalendarDialog />
        </Dialog>
      </div>
      <Calendar
        mode="single"
        selected={date}
        // selected={currentDate}
        onSelect={(day) => {
          setDate(date);
          setCurrentDate((prev) => (day ? day : prev));
        }}
        className="m-0 mx-auto hidden rounded-md border sm:block"
      />
      <Filters />
    </aside>
  );
};

export const Filters: React.FC = () => {
  const { filters, setFilters } = useContext(CalendarContext);
  // useEffect(() => {
  //   console.log(filters);
  // }, [filters]);

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
