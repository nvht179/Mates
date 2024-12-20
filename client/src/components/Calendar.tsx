import React from "react";
import { Event } from "../interfaces/Event";

interface CalendarProps {
  displayDate: Date;
  events: Event[];
}

const HOURWIDTH = 5; // 1 hour = 5rem
const Calendar: React.FC<CalendarProps> = ({ displayDate, events }) => {
  // Get the start of the week (Monday)
  const startOfWeek = new Date(
    displayDate.getFullYear(),
    displayDate.getMonth(),
    displayDate.getDate() -
      (displayDate.getDay() === 0 ? 6 : displayDate.getDay() - 1),
  );

  // Generate an array of 7 days (Monday to Sunday)
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    return day;
  });

  // Generate time slots (e.g., every hour)
  const timeSlots = Array.from({ length: 24 }).map(
    (_, index) => index.toString().padStart(2, "0") + ":00",
  );

  // Helper function to calculate recurring events
  const isRecurringEvent = (event: Event, day: Date): boolean => {
    if (!event.repeatTime) return false;

    const eventStart = new Date(event.startTime);
    const eventStartMidnight = new Date(
      eventStart.getFullYear(),
      eventStart.getMonth(),
      eventStart.getDate(),
    );
    const dayMidnight = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
    );

    const dayDiff = Math.floor(
      (dayMidnight.getTime() - eventStartMidnight.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    switch (event.repeatTime) {
      case "Weekly":
        return dayDiff % 7 === 0 && dayDiff >= 0;
      case "Bi-Weekly":
        return dayDiff % 14 === 0 && dayDiff >= 0;
      case "Monthly":
        return eventStartMidnight.getDate() === dayMidnight.getDate();
      default:
        return false;
    }
  };

  // Function to calculate event positioning
  const getEventStyles = (event: Event) => {
    const eventStart = new Date(event.startTime);
    const eventEnd = new Date(event.endTime);

    const startHour = eventStart.getHours();
    const endHour = eventEnd.getHours();
    const durationInHours = Math.max(endHour - startHour, 1);

    return {
      top: `${startHour * HOURWIDTH}rem`, // Each hour is 5rem tall
      height: `${durationInHours * HOURWIDTH}rem`,
    };
  };

  return (
    <div className="flex h-full w-full flex-col border border-fg-border">
      <div className="flex flex-row">
        {/* Time Column */}
        <div className="w-fit bg-bg-dark pl-6">
          {timeSlots.map((time, index) => (
            <div
              key={index}
              className="flex items-end border-b-2 text-sm text-fg-default"
              style={{ height: `${HOURWIDTH}rem` }}
            >
              {time}
            </div>
          ))}
        </div>

        {/* Weekly Calendar */}
        <div className="relative col-span-7 grid flex-1 grid-cols-7 divide-x-2">
          {/* Header Row for Days */}
          <div className="absolute left-0 top-0 z-10 grid w-full grid-cols-7 bg-bg-soft">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="top-0 flex items-center justify-center border border-fg-border text-sm font-semibold"
                style={{ height: `${HOURWIDTH}rem` }}
              >
                {day.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                })}
              </div>
            ))}
          </div>

          {/* Events Grid */}
          {weekDays.map((day, colIndex) => (
            <div
              key={colIndex}
              className="relative"
              style={{
                height: `${HOURWIDTH * 24}rem`,
                marginTop: `${HOURWIDTH}rem`,
              }}
            >
              {events
                .filter(
                  (event) =>
                    new Date(event.startTime).toDateString() ===
                      day.toDateString() ||
                    new Date(event.endTime).toDateString() ===
                      day.toDateString() ||
                    isRecurringEvent(event, day),
                )
                .map((event) => (
                  <div
                    key={event.eventID}
                    className="absolute left-1 right-1 cursor-pointer truncate rounded border-2 border-fg-alt bg-primary-default px-2 py-1 text-xs text-white"
                    style={getEventStyles(event)}
                    title={event.description}
                    onClick={() =>
                      alert(`Event: ${event.title}\n\n${event.description}`)
                    }
                  >
                    <p>{event.title}</p>
                    <p>
                      {new Date(event.startTime).toLocaleTimeString()} -{" "}
                      {new Date(event.endTime).toLocaleTimeString()}
                    </p>
                    <p>{event.description}</p>
                    {event.repeatTime && (
                      <p className="italic text-gray-300">
                        Repeats: {event.repeatTime}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
