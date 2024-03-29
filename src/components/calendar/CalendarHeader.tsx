import React, { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import { Button } from "../ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { CalendarDays, ChevronRight } from "lucide-react";
import { Calendar } from "../ui/Calendar";
import { Separator } from "../ui/Separator";
import { ChevronLeft } from "lucide-react";
import { addMonths, format, subMonths } from "date-fns";

export const CalendarHeader: React.FC = () => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <header className="mb-4 flex items-center justify-end px-4 py-2 sm:mb-0">
      <Button
        variant={"outline"}
        // className="border-2 border-orange-300 dark:border-dimWhite"
        onClick={() => {
          setCurrentDate(new Date());
        }}
      >
        Today
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="mx-3 block sm:hidden" variant={"outline"}>
            <CalendarDays className="h-4 w-4" />
            <span className="sr-only">Open calendar</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => {
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
