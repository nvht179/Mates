import { useEffect, useRef, useState } from "react";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState, useLazyViewNotificationsQuery } from "../store";
import NotificationCard from "./NotificationCard";
import { NotificationType } from "../interfaces/Notification";

function Notification() {
  const [isActivated, setIsActivated] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [sortedNotifications, setSortedNotifications] = useState<NotificationType[]>([]);

  const user = useSelector((state: RootState) => state.user);

  const [viewNotifications, { data, isLoading, isSuccess }] =
    useLazyViewNotificationsQuery();

  // Fetch notifications and set initial state
  useEffect(() => {
    if (isSuccess) {
      const fetchedNotifications = [...data.notifications].sort(
        (a, b) => a.id - b.id,
      ) as NotificationType[];
      setNotifications(fetchedNotifications);
    }
  }, [isSuccess, data]);

  // Sort notifications whenever the `notifications` array changes
  useEffect(() => {
    const sorted = [...notifications].sort((a, b) => {
      if (a.statusRead === b.statusRead) return 0; // Maintain order if status is the same
      // @ts-expect-error-"Read" comes before "Unread"
      return a.statusRead === "Read" ? -1 : 1; // "Read" comes before "Unread"
    });
    setSortedNotifications(sorted);
  }, [notifications]);

  const divEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (divEl.current && !divEl.current.contains(e.target as Node)) {
        setIsActivated(false);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleShowNotification = () => {
    if (user.id !== null && !isActivated) {
      viewNotifications({ userId: user.id });
    }
    setIsActivated((prev) => !prev);
  };

  const renderedNotifications =
    sortedNotifications.length > 0 ? (
      sortedNotifications.map((notification) => (
        <div key={notification.id}>
          <NotificationCard notification={notification} />
        </div>
      ))
    ) : (
      <div className="p-2 text-center text-fg-default">
        No notifications available
      </div>
    );

  return (
    <div ref={divEl} className="relative select-none">
      <div>
        {isActivated ? (
          <IoIosNotifications
            className="cursor-pointer text-xl text-primary-default active:opacity-30"
            onClick={handleShowNotification}
          />
        ) : (
          <IoIosNotificationsOutline
            className="cursor-pointer text-xl active:opacity-30"
            onClick={handleShowNotification}
          />
        )}
      </div>
      <div className="absolute right-0 z-50 mt-3 w-96 select-text rounded-md border border-fg-border bg-bg-darker text-black shadow-lg">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          isActivated && (
            <div className="scrollbar-hidden max-h-96 overflow-hidden overflow-y-scroll rounded">
              {renderedNotifications}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Notification;