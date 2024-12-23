import { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useLazyViewNotificationsQuery } from "../store";
import NotificationCard from "./NotificationCard";
import { NotificationType } from "../interfaces/Notification";

function Notification() {
  const [isActivated, setIsActivated] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const user = useSelector((state: RootState) => state.user);

  const [viewNotifications, { data, isLoading, isSuccess }] =
    useLazyViewNotificationsQuery();

  useEffect(() => {
    if (isSuccess) {
      setNotifications(
        [...data.notifications].sort(
          (a, b) => a.id - b.id,
        ) as NotificationType[],
      );
    }
  }, [isSuccess, data]);

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
    if (user.id !== null && isActivated === false) {
      viewNotifications({ userId: user.id });
    }
    setIsActivated((prev) => !prev);
  };

  const renderedNotifications =
    notifications.length > 0 ? (
      notifications.map((notification) => (
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
      <div className="absolute right-0 z-50 mt-3 w-96 rounded-md border border-fg-border bg-bg-darker text-black shadow-lg select-text">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          isActivated && <div>{renderedNotifications}</div>
        )}
      </div>
    </div>
  );
}

export default Notification;
