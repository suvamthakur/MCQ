import { useState } from "react";
import Calendar from "./components/Calendar";
import WeekCalendar from "./components/WeekCalendar";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-5xl mx-auto my-2">
        <div className="flex justify-center">
          <div className="text-center border flex items-center w-max cursor-pointer">
            <div
              className={`px-2  ${viewMode == "month" ? "bg-blue-200" : ""}`}
              onClick={() => setViewMode("month")}
            >
              Month
            </div>
            <div
              className={`px-2 ${viewMode == "week" ? " bg-blue-200" : ""}`}
              onClick={() => setViewMode("week")}
            >
              Week
            </div>
          </div>
        </div>

        {viewMode == "month" && (
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={(date) => setSelectedDate(date)}
          />
        )}

        {viewMode == "week" && (
          <WeekCalendar
            selectedDate={selectedDate}
            onDateSelect={(date) => setSelectedDate(date)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
