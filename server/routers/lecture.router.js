const express = require("express");
const LectureController = require("../controllers/lecture.controller");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const verifyToken = require("../middleware/verifyToken.middleware");

router.use(verifyToken);
router.post("/create", upload, LectureController.createLectureWithAttachments);
router.get("/view-all-lectures-in-class/:classID", LectureController.viewAllLecturesInClass);
router.delete("/remove-lecture/:lectureId", LectureController.removeLecture);
router.put("/edit", upload, LectureController.editLecture);

module.exports = router;