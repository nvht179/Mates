const router = require("express").Router();
const ClassController = require('../controllers/class.controller')

router.post("/create", ClassController.addNewClass);

module.exports = router;
