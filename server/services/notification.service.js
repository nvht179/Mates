const NotificationDB = require("../db/notification.db");
const { ErrorHandler } = require("../helpers/error");

class NotificationService {
  notification = async (userID, postID, notiTitle, content, type, commentID, assignmentID) => {
    try {
      const notification = await NotificationDB.notification(userID, postID, notiTitle, content, type, commentID, assignmentID);
      if (!notification) {
        throw new ErrorHandler(403, "The error with notification in posts");
      }
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  async getAllNotifications(userId) {
    try {
      const notifications = await NotificationDB.getNotificationsByUserId(userId);
      return notifications;
    } catch (err) {
      throw new ErrorHandler(500, `Error in NotificationService - getAllNotifications: ${err.message}`);
    }
  }

  async deleteNotification(notificationId) {
    try {
      const result = await NotificationDB.deleteNotification(notificationId);
      if (!result) {
        throw new ErrorHandler(404, "Notification not found");
      }
      return result;
    } catch (err) {
      throw new ErrorHandler(500, `Error in NotificationService - deleteNotification: ${err.message}`);
    }
  }

  async markAsRead(notificationId) {
    try {
      const updatedNotification = await NotificationDB.updateNotificationStatus(notificationId, true);
      if (!updatedNotification) {
        throw new ErrorHandler(404, "Notification not found");
      }
      return updatedNotification;
    } catch (err) {
      throw new ErrorHandler(500, `Error in NotificationService - markAsRead: ${err.message}`);
    }
  }

  async markAsUnRead(notificationId) {
    try {
      const updatedNotification = await NotificationDB.updateNotificationStatus(notificationId, false);
      if (!updatedNotification) {
        throw new ErrorHandler(404, "Notification not found");
      }
      return updatedNotification;
    } catch (err) {
      throw new ErrorHandler(500, `Error in NotificationService - markAsUnRead: ${err.message}`);
    }
  }
}

module.exports = new NotificationService();