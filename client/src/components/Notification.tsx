import { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useViewNotificationsQuery } from "../store";
import NotificationCard from "./NotificationCard";

function Notification() {
  const [isActivated, setIsActivated] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const { data } = useViewNotificationsQuery({
    userId: user.id ?? 0,
  });
  const notifications = data?.notifications ?? [];
  console.log(data);

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

  const renderedNotifications = notifications.map((notification) => {
    return (
      <div>
        <NotificationCard notification={notification}/>
      </div>
    );
  });

  return (
    <div ref={divEl} className="relative">
      <div>
        {isActivated ? (
          <IoIosNotifications className="cursor-pointer text-xl text-primary-default active:opacity-30" />
        ) : (
          <IoIosNotificationsOutline
            className="cursor-pointer text-xl active:opacity-30"
            onClick={() => setIsActivated(true)}
          />
        )}
      </div>
      <div className="absolute right-0 w-48">
        {isActivated && (
          <div className="z-10 mt-2 w-48 cursor-pointer rounded-md border border-fg-border bg-bg-darker text-black shadow-lg">
            {renderedNotifications}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
