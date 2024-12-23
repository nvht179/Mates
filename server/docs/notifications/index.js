const removeNotification = require('./removeNotification');
const viewAllNotification = require('./viewAllNotification')
const markAsRead = require('./markAsRead');
const markAsRead = require('./markAsUnread');


module.exports = {
  "/notifications/view-all/{userId}": {
    ...viewAllNotification
  },
  "/notifications/remove/{notificationId}": {
    ...removeNotification
  },
  "/notifications/mark-as-read/{notificationId}/mark-as-read": {
    ...markAsRead
  },
  "/notifications/mark-as-unread/{notificationId}/mark-as-unread": {
    ...markAsUnread
  },
};