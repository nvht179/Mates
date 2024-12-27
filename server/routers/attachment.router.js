const express = require("express");
const AttachmentController = require("../controllers/attachment.controller");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const verifyToken = require("../middleware/verifyToken.middleware");

router.use(verifyToken);

router.post("/create", upload, AttachmentController.addAttachment);
router.get("/:id", AttachmentController.getAttachmentById);
router.get("/", AttachmentController.getAttachmentsByPostId);
router.put("/edit", AttachmentController.editAttachments);

module.exports = router;