import { useState } from "react";
import { NotificationType } from "../interfaces/Notification";
import { formatDate } from "../utils/date";
import {
  useDeleteNotificationMutation,
  useMarkAsreadNotificationMutation,
  useMarkAsUnreadNotificationMutation,
} from "../store";
import {
  IoMail,
  IoMailOutline,
  IoTrash,
  IoTrashOutline,
} from "react-icons/io5";

interface NotificationCardProps {
  notification: NotificationType;
}

type Button = "Mail" | "Trash" | null;

function NotificationCard({ notification }: NotificationCardProps) {
  const [buttonHovered, setButtonHovered] = useState<Button>(null);

  const [deleteNotification] = useDeleteNotificationMutation();
  const [markAsReadNotification] = useMarkAsreadNotificationMutation();
  const [markAsUnreadNotification] = useMarkAsUnreadNotificationMutation();

  const handleDeleteClick = () => {
    deleteNotification({ notificationId: notification.id });
  };

  const handleReadingNotification = () => {
    if (notification.statusRead) {
      markAsUnreadNotification({ notificationId: notification.id });
    } else {
      markAsReadNotification({ notificationId: notification.id });
    }
  };

  const handleNavigationClick = () => {
    // add navigation logic here
  };

  return (
    <div className="relative z-50 select-none bg-bg-soft">
      <div
        className="border-b border-fg-border px-4 py-4 active:bg-opacity-30"
        onClick={handleNavigationClick}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{notification.title}</p>
            <p className="text-xs font-light">
              {formatDate(notification.createdAt)}
            </p>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <p
              className={`text-xs ${notification.statusRead ? "text-fg-disabled" : "text-fg-softer"}`}
            >
              {notification.statusRead ? "Read" : "Unread"}
            </p>
            <div
              onMouseEnter={() => setButtonHovered("Mail")}
              onMouseLeave={() => setButtonHovered(null)}
              onClick={handleReadingNotification}
            >
              {buttonHovered === "Mail" ? (
                <IoMail className="font-xl cursor-pointer text-primary-default" />
              ) : (
                <IoMailOutline className="font-xl cursor-pointer text-fg-default" />
              )}
            </div>
            <div
              onMouseEnter={() => setButtonHovered("Trash")}
              onMouseLeave={() => setButtonHovered(null)}
            >
              {buttonHovered === "Trash" ? (
                <IoTrash
                  className="font-xl cursor-pointer text-red-default"
                  onClick={handleDeleteClick}
                />
              ) : (
                <IoTrashOutline
                  className="font-xl cursor-pointer text-fg-default"
                  onClick={handleDeleteClick}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <p className="select-text text-wrap text-sm">
            {notification.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
