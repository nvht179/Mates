import { Event } from "../interfaces/Event";
import { useNavigate } from "react-router-dom";
import OptionDropdown from "./OptionDropdown";
import { RootState, useDeleteEventMutation } from "../store";
import { useSelector } from "react-redux";

interface CalendarProps {
  displayDate: Date;
  events: Event[];
}

const HOUR_LENGTH = 5; // 1 hour = 5rem
function Calendar({ displayDate, events }: CalendarProps) {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.user.role);
  const [deleteEvent] = useDeleteEventMutation();

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

    // Calculate the total minutes from the start of the day
    const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
    const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();

    // Calculate the duration in minutes
    const durationInMinutes = Math.max(endMinutes - startMinutes, 90); // Minimum duration of 1.5 hours (90 minutes)

    // Convert minutes to rem (1 hour = 5rem, so 1 minute = 5/60 rem)
    const minutesToRem = (minutes: number) => (minutes * HOUR_LENGTH) / 60;

    return {
      top: `${minutesToRem(startMinutes)}rem`, // Position from the top
      height: `${minutesToRem(durationInMinutes)}rem`, // Height of the event
    };
  };

  const handleEditClick = (event: Event) => {
    navigate("/calendar/event-details", { state: { event, displayDate } });
  };

  const handleDeleteClick = (event: Event) => {
    deleteEvent({ eventID: event.eventID });
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
              style={{ height: `${HOUR_LENGTH}rem` }}
            >
              {time}
            </div>
          ))}
        </div>

        <div className="flex-1">
          {/* Header Row for Days */}
          <div className="sticky top-0 z-10 grid w-full grid-cols-7 bg-bg-soft">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="top-0 flex items-center justify-center border border-fg-border text-sm font-semibold"
                style={{ height: `${HOUR_LENGTH}rem` }}
              >
                {day.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                })}
              </div>
            ))}
          </div>

          {/* Weekly Calendar */}
          <div className="relative col-span-7 grid flex-1 grid-cols-7 divide-x-2">
            {/* Events Grid */}
            {weekDays.map((day, colIndex) => (
              <div
                key={colIndex}
                className="relative"
                style={{
                  height: `${HOUR_LENGTH * 24}rem`,
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
                      className="absolute w-full rounded border-2 border-fg-alt bg-bg-darker px-2 py-1 text-sm"
                      style={getEventStyles(event)}
                      title={event.description}
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="font-semibold">{event.title}</h2>
                        {(role === "Teacher" || event.classID === null) && (
                          <OptionDropdown
                            handleEditClick={() => handleEditClick(event)}
                            handleDeleteClick={() => handleDeleteClick(event)}
                          />
                        )}
                      </div>
                      <p className="text-xs">
                        {new Date(event.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(event.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="mt-2 text-wrap">
                        Description: {event.description}
                      </p>
                      {event.repeatTime && (
                        <p className="text-xs font-light italic">
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
    </div>
  );
}

export default Calendar;
