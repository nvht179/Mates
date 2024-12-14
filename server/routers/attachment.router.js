const express = require("express");
const AttachmentController = require("../controllers/attachment.controller");
const router = express.Router();

router.post("/create", AttachmentController.addAttachment);
router.get("/:id", AttachmentController.getAttachmentById);
module.exports = router;