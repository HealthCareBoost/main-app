import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "../ui/Button";
import { Dialog, DialogTrigger } from "../ui/Dialog";
import { Separator } from "../ui/Separator";
import { WeeklyCalendarContext } from "./CalendarContext";
import { WeeklyCalendarDialog } from "./CalendarDialog";
import { removeTimezoneOffset } from "@/src/utils/calendarUtils";

type CalendarHeaderProps = {
  getPreviousWeek: () => void;
  getNextWeek: () => void;
};

export const WeeklyCalendarHeader: React.FC<CalendarHeaderProps> = ({
  getNextWeek,
  getPreviousWeek,
}) => {
  const { currentDate, setSelectedDay } = useContext(WeeklyCalendarContext);

  return (
    <div className="header flex justify-between border-b p-2">
      <span className="text-lg font-bold">
        {format(currentDate, "MMMM-yyyy")}
      </span>
      <div className="buttons mx-2 flex flex-row content-center justify-evenly">
        <Button
          className="mx-2 flex-1 p-1"
          onClick={() => {
            getPreviousWeek();
          }}
          variant="outline"
        >
          <ChevronLeft /> Previous Week
        </Button>
        <Button
          className="mx-2 flex-1 p-1"
          onClick={() => {
            getNextWeek();
          }}
          variant="outline"
        >
          Next Week <ChevronRight />
        </Button>

        {/* <button
          className="p-1"
          onClick={() => {
            getPreviousWeek();
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
        </button> */}

        {/* <button
          className="p-1"
          onClick={() => {
            getNextWeek();
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
        </button> */}
        <Separator className={"inline"} orientation={"vertical"} />
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
          <WeeklyCalendarDialog />
        </Dialog>
      </div>
    </div>
  );
};
