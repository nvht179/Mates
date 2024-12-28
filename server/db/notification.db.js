const { Notification } = require("../entities");

class NotificationDB {
  getNotificationsByUserId = async (userId) => {
    try {
      const notifications = await Notification.findAll({
        where: { targetId: userId }, 
      });
      return notifications;
    } catch (err) {
      throw new Error("Error fetching notifications by userId: " + err.message);
    }
  };

  deleteNotification = async (notificationId) => {
    try {
      const notification = await Notification.findByPk(notificationId);
      if (!notification) return null;

      await notification.destroy();
      return notification;
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

  notification = async (userID, postID, notiTitle, content, type, commentID, assignmentID) => {
    const targetId = userID;
    const postId = postID;
    const title = notiTitle;
    const commentId = commentID;
    const assignmentId = assignmentID;
    const notification = await Notification.create({
      targetId,
      postId,
      title,
      content,
      type,
      commentId,
      assignmentId
    })
    return notification;
  };
}

module.exports = new NotificationDB();