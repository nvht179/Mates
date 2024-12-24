const express = require("express");
const NotificationController = require("../controllers/notification.controller");

const router = express.Router();

// View all notifications của người dùng
router.get("/view-all/:userId", NotificationController.getAllNotifications);

// Remove notification
router.delete("/remove/:notificationId", NotificationController.deleteNotification);

// Mark notification as read
router.put("/mark-as-read/:notificationId/mark-as-read", NotificationController.markAsRead);

router.put("/mark-as-unread/:notificationId/mark-as-unread", NotificationController.markAsUnRead);

module.exports = router;