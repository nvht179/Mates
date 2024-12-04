const router = require("express").Router();
const { getAllStudents } = require("../controllers/student.controller");

router.route("/allStudents").get(getAllStudents);

module.exports = router;
