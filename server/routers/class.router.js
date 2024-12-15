const router = require("express").Router();
const ClassController = require('../controllers/class.controller')

router.post("/create-class", ClassController.createNewClass);
router.get("/view-all-classes", ClassController.viewAllClasses);

module.exports = router;
