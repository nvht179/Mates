import { Notification } from "../interfaces/Notification";
import { useDeleteNotificationMutation, useMarkAsreadNotificationMutation } from "../store";

function NotificationCard({ notification }: { notification: Notification }) {
  const [deleteNotification] = useDeleteNotificationMutation();
  const [markAsReadNotification] = useMarkAsreadNotificationMutation();

  const handleDeleteClick = () => {
    deleteNotification({ notificationId: notification.id });
  };

  const handleMarkAsReadClick = () => {
    markAsReadNotification({ notificationId: notification.id });
  };

  return (
    <div className="bg-bg-darker">
      <div className="py-1">
        <p className="block px-4 py-2 text-sm font-semibold hover:bg-primary-default hover:text-white">
          {notification.title}
        </p>
      </div>
      <div className="mt-2 flex justify-end space-x-2">
        <button
          className="rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-700"
          onClick={handleMarkAsReadClick}
        >
          Mark as Read
        </button>
        <button
          className="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-700"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NotificationCard;
