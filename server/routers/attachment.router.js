const express = require("express");
const AttachmentController = require("../controllers/attachment.controller");
const router = express.Router();

router.post("/create", AttachmentController.addAttachment);
router.get("/:id", AttachmentController.getAttachmentById);
router.get("/", AttachmentController.getAttachmentsByPostId);
router.put("/edit", AttachmentController.editAttachments);

module.exports = router;