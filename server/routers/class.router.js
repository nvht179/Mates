const router = require("express").Router();
const ClassController = require('../controllers/class.controller')

router.post("/create-class", ClassController.createNewClass);
router.get("/view-all-classes", ClassController.viewAllClasses);
router.post("/add-students-to-class", ClassController.addStudentsToClass);
router.post("/add-teachers-to-class", ClassController.addTeachersToClass);
router.get("/view-all-students-in-class/:classID", ClassController.viewAllStudentsInClass);
router.get("/view-all-teachers-in-class/:classID", ClassController.viewAllTeachersInClass);
router.delete("/remove-students-in-class/:classID/:studentsEmail", ClassController.removeStudentsInClass)
router.delete("/remove-teachers-in-class/:classID/:teachersEmail", ClassController.removeTeachersInClass)

module.exports = router;
