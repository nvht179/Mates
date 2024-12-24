const { Notification } = require("../entities");

class NotificationDB {
  // Lấy tất cả thông báo của người dùng theo userId
  getNotificationsByUserId = async (userId) => {
    try {
      const notifications = await Notification.findAll({
        where: { targetId: userId }, // Lọc thông báo theo targetId (userId)
      });
      return notifications;
    } catch (err) {
      throw new Error("Error fetching notifications by userId: " + err.message);
    }
  };

  // Xóa một notification theo notificationId
  deleteNotification = async (notificationId) => {
    try {
      const notification = await Notification.findByPk(notificationId);
      if (!notification) return null; // Nếu không tìm thấy notification

      // Xóa notification
      await notification.destroy();
      return notification; // Trả về thông báo đã xóa
    } catch (err) {
      throw new Error("Error deleting notification: " + err.message);
    }
  };

  updateNotificationStatus = async (notificationId, statusRead) => {
    try {
      const notification = await Notification.findByPk(notificationId);
      if (!notification) return null; 

      notification.statusRead = statusRead;
      await notification.save();
      return notification; 
    } catch (err) {
      throw new Error("Error updating notification status: " + err.message);
    }
  };
}

module.exports = new NotificationDB();