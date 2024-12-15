const router = require("express").Router();
const ClassController = require('../controllers/class.controller')

router.post("/create-class", ClassController.createNewClass);

module.exports = router;
