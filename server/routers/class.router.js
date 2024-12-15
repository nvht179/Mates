const router = require("express").Router();
const ClassController = require('../controllers/class.controller')

router.post("/create-class", ClassController.createNewClass);
router.get("/view-all-classes", ClassController.viewAllClasses);
router.post("/add-students-to-class", ClassController.addStudentsToClass);
router.post("/add-teachers-to-class", ClassController.addTeachersToClass);
router.post("/view-all-students-in-class", ClassController.viewAllStudentsInClass);
router.post("/view-all-teachers-in-class", ClassController.viewAllTeachersInClass);

module.exports = router;
