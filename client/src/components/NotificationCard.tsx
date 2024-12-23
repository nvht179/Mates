import { NotificationType } from "../interfaces/Notification";
import {
  useDeleteNotificationMutation,
  useMarkAsreadNotificationMutation,
} from "../store";
import { BsTrash3 } from "react-icons/bs";
import MailIcon from "./MailIcon";
import { useState } from "react";

interface NotificationCardProps {
  notification: NotificationType;
}

function NotificationCard({ notification }: NotificationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const [deleteNotification] = useDeleteNotificationMutation();
  const [markAsReadNotification] = useMarkAsreadNotificationMutation();

  const handleDeleteClick = () => {
    deleteNotification({ notificationId: notification.id });
  };

  const handleMarkAsReadClick = () => {
    markAsReadNotification({ notificationId: notification.id });
  };

  const handleNavigationClick = () => {
    // add navigation logic here
  };

  return (
    <div className="bg-bg-darker">
      <div
        className="cursor-pointer px-4 py-4 hover:bg-bg-dark hover:text-primary-default active:bg-opacity-30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleNavigationClick}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <p className="text-sm font-semibold">{notification.title}</p>
            <p className="font-light">{notification.createdAt}</p>
          </div>
          <div className="flex justify-end space-x-4">
            <MailIcon
              onClick={handleMarkAsReadClick}
              isHovered={isHovered}
              isRead={notification.statusRead}
            />
            {isHovered ? (
              <BsTrash3
                className="font-xl cursor-pointer text-red-default"
                onClick={handleDeleteClick}
              />
            ) : (
              <BsTrash3
                className="font-xl cursor-pointer text-fg-default"
                onClick={handleDeleteClick}
              />
            )}
          </div>
        </div>
        <div className="mt-2">
          <p className="text-wrap text-sm">{notification.content}</p>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
