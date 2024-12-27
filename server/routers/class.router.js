const router = require("express").Router();
const ClassController = require('../controllers/class.controller')
const avatar = require("../middleware/avatar.middleware");
const verifyToken = require("../middleware/verifyToken.middleware");

// router.use(verifyToken);
router.post("/create-class", ClassController.createNewClass);
router.get("/view-all-classes/:email", ClassController.viewAllClasses);
router.post("/add-students-to-class", ClassController.addStudentsToClass);
router.post("/add-teachers-to-class", ClassController.addTeachersToClass);
router.get("/view-all-students-in-class/:classID", ClassController.viewAllStudentsInClass);
router.get("/view-all-teachers-in-class/:classID", ClassController.viewAllTeachersInClass);
router.delete("/remove-students-in-class", ClassController.removeStudentsInClass)
router.delete("/remove-teachers-in-class", ClassController.removeTeachersInClass)
router.delete("/remove-class/:classID", ClassController.removeClass)
router.get("/view-class-info/:classID", ClassController.viewClassInfo);
router.put("/edit-class-info", ClassController.editClassInfo);
router.put("/set-avatar-class", avatar, ClassController.setAvatarClass);

module.exports = router;
