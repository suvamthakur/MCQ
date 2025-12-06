import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
  addMonths,
  format,
} from "date-fns";
import { useState } from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ selectedDate = new Date(), onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const SOM = startOfMonth(currentDate);
  const EOM = endOfMonth(currentDate);

  const days = eachDayOfInterval({
    start: startOfWeek(SOM),
    end: endOfWeek(EOM),
  });

  const isSelecedDate = (selectedDate, currDate) =>
    selectedDate.getDate() == currDate.getDate() &&
    selectedDate.getMonth() == currDate.getMonth() &&
    selectedDate.getYear() == currDate.getYear();

  return (
    <div className="">
      <div className="flex items-center">
        <button
          className="border px-3 py-1"
          onClick={() => setCurrentDate(addMonths(currentDate, -1))}
        >
          prev
        </button>
        <div className="w-30 py-1 flex items-center justify-center mx-4 font-semibold">
          {format(currentDate, "LLL, yyyy")}
        </div>
        <button
          className="border px-3 py-1"
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
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

export default Calendar;
