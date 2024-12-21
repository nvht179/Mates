const removeNotification = require('./removeNotification');
const viewAllNotification = require('./viewAllNotification')
const markAsRead = require('./markAsRead')

module.exports = {
  "/notifications/view-all/:userId": {
    ...viewAllNotification
  },
  "/notifications/remove/:notificationId": {
    ...removeNotification
  },
  "/notifications/mark-as-read/:notificationId/mark-as-read": {
    ...markAsRead
  },
};