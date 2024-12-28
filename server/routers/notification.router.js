const express = require("express");
const NotificationController = require("../controllers/notification.controller");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.middleware");

router.use(verifyToken);

router.get("/view-all/:userId", NotificationController.getAllNotifications);

router.delete("/remove/:notificationId", NotificationController.deleteNotification);

router.put("/mark-as-read/:notificationId/mark-as-read", NotificationController.markAsRead);

router.put("/mark-as-unread/:notificationId/mark-as-unread", NotificationController.markAsUnRead);

module.exports = router;