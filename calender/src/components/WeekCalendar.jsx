import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
  addMonths,
  format,
  addWeeks,
} from "date-fns";
import { useState } from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeekCalendar = ({ selectedDate = new Date(), onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: endOfWeek(currentDate),
  });

  const isSelecedDate = (selectedDate, currDate) =>
    selectedDate.getDate() == currDate.getDate() &&
    selectedDate.getMonth() == currDate.getMonth() &&
    selectedDate.getYear() == currDate.getYear();

  console.log({ currentDate });

  const render = () => {
    const startWeekDate = startOfWeek(currentDate);
    const endWeekDate = endOfWeek(currentDate);

    console.log({ startWeekDate });
    console.log({ endWeekDate });

    if (startWeekDate.getMonth() == endWeekDate.getMonth()) {
      console.log("true");
      return format(currentDate, "LLL, yyyy");
    }
    console.log("false");

    return (
      <p>
        {format(startWeekDate, "LLL")} - {format(endWeekDate, "LLL, yyyy")}
      </p>
    );
  };

  return (
    <div className="">
      <div className="flex items-center">
        <button
          className="border px-3 py-1"
          onClick={() => setCurrentDate(addWeeks(currentDate, -1))}
        >
          prev
        </button>
        <div className="w-30 py-1 flex items-center justify-center mx-4 font-semibold">
          {render()}
        </div>
        <button
          className="border px-3 py-1"
          onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
        >
          next
        </button>
      </div>
      <div className="grid grid-cols-7 mt-4">
        {weekDays.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center font-semibold"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 mt-2">
        {days.map((day) => (
          <div
            key={day}
            className={`flex items-center justify-center border-r border-b py-4 ${
              isToday(day) ? "bg-blue-300" : ""
            } ${isSelecedDate(selectedDate, day) ? "bg-blue-100" : ""}`}
            onClick={() => onDateSelect(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
