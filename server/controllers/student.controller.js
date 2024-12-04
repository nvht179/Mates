const StudentService = require("../services/student.service");

const getAllStudents = async (req, res) => {
  const students = await StudentService.getAllStudents();
  res.json(students.students.rows);
};

module.exports = {
  getAllStudents,
};
