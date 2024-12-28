const NotificationService = require("../services/notification.service");

class NotificationController {
  getAllNotifications = async (req, res) => {
    try {
      const { userId } = req.params;
      
      const notifications = await NotificationService.getAllNotifications(userId);
      const message = "Notifications fetched successfully";
      res.status(200).json({ message, notifications });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  deleteNotification = async (req, res) => {
    try {
      const { notificationId } = req.params;
      await NotificationService.deleteNotification(notificationId);
      const message = "Notification deleted successfully";
      res.status(200).json({ message });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  markAsRead = async (req, res) => {
    try {
      const { notificationId } = req.params;
      const updatedNotification = await NotificationService.markAsRead(notificationId);
      const message = "Notification marked as read";
      res.status(200).json({ message, updatedNotification });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  markAsUnRead = async (req, res) => {
    try {
      const { notificationId } = req.params;
      const updatedNotification = await NotificationService.markAsUnRead(notificationId);
      const message = "Notification marked as unread";
      res.status(200).json({ message, updatedNotification });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };
}

module.exports = new NotificationController();