const ClassService = require("../services/class.service");

class ClassController {
  createNewClass = async (req, res) => {
    try {
      const { className, code, description } = req.body;
      const newClass = await ClassService.createNewClass({
        className,
        code,
        description,
      });
      res.status(200).json(newClass);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };

  viewAllClasses = async (req, res) => {
    try {
      const allClasses = await ClassService.viewAllClasses();
      res.status(200).json(allClasses);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };

  addStudentsToClass = async (req, res) => {
    try {
      const {classID, emailStudents} = req.body;
      const studentsClass = await ClassService.addStudentsToClass(classID, emailStudents);
      res.status(200).json(studentsClass);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };

  addTeachersToClass = async (req, res) => {
    try {
      const {classID, newTeachers} = req.body;
      const teachersClass = await ClassService.addTeachersToClass(classID, newTeachers);
      res.status(200).json(teachersClass);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };

  viewAllStudentsInClass = async (req, res) => {
    try {
      const {classID} = req.body;
      const studentsInClass = await ClassService.viewAllStudentsInClass(classID);
      res.status(200).json(studentsInClass);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };

  viewAllTeachersInClass = async (req, res) => {
    try {
      const {classID} = req.body;
      const teachersInClass = await ClassService.viewAllTeachersInClass(classID);
      res.status(200).json(teachersInClass);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };
}

module.exports = new ClassController();
