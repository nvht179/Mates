const express = require("express");
const LectureController = require("../controllers/lecture.controller");
const router = express.Router();
const upload = require("../middleware/upload.middleware");

router.post("/create", upload, LectureController.createLectureWithAttachments);
router.get("/view-all-lectures-in-class/:classID", LectureController.viewAllLecturesInClass);
// router.get("/", AttachmentController.getAttachmentsByPostId);
// router.put("/edit", AttachmentController.editAttachments);

module.exports = router;