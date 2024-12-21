const NotificationDB = require("../db/notification.db");
const { ErrorHandler } = require("../helpers/error");

class NotificationService {
  // Lấy tất cả notifications của người dùng
  async getAllNotifications(userId) {
    try {
      const notifications = await NotificationDB.getNotificationsByUserId(userId);
      return notifications;
    } catch (err) {
      throw new ErrorHandler(500, `Error in NotificationService - getAllNotifications: ${err.message}`);
    }
  }

  // Xóa một notification theo notificationId
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

  // Đánh dấu một notification là đã đọc
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
}

module.exports = new NotificationService();