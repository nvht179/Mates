const { P } = require("pino");
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
      const message = "Successful";
      res.status(200).json({ message, newClass });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(err.statusCode).json({ message });
    }
  };

  viewAllClasses = async (req, res) => {
    try {
      const allClasses = await ClassService.viewAllClasses();
      const message = "Successful";
      res.status(200).json({ message, allClasses });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(err.statusCode).json({ message });
    }
  };

  addStudentsToClass = async (req, res) => {
    try {
      const { classID, emailStudents } = req.body;
      const studentsClass = await ClassService.addStudentsToClass(classID, emailStudents);
      const message = "Successful";
      res.status(200).json({ message, studentsClass });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(err.statusCode).json({ message });
    }
  };

  addTeachersToClass = async (req, res) => {
    try {
      const { classID, newTeachers } = req.body;
      const teachersClass = await ClassService.addTeachersToClass(classID, newTeachers);
      const message = "Successful";
      res.status(200).json({ message, teachersClass });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(err.statusCode).json({ message });
    }
  };

  viewAllStudentsInClass = async (req, res) => {
    try {
      const { classID } = req.params;
      const studentsInClass = await ClassService.viewAllStudentsInClass(classID);
      const message = "Successful";
      res.status(200).json({ message, studentsInClass });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(err.statusCode).json({ message });
    }
  };

  viewAllTeachersInClass = async (req, res) => {
    try {
      const { classID } = req.params;
      const teachersInClass = await ClassService.viewAllTeachersInClass(classID);
      const message = "Successful";
      res.status(200).json({ message, teachersInClass });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(err.statusCode).json({ message });
    }
  };

  removeStudentsInClass = async (req, res) => {
    try {
      const { classID, studentsEmail } = req.params;
      const removedStudents = await ClassService.removeStudentsInClass(classID, studentsEmail);
      const studentsInClass = await ClassService.viewAllStudentsInClass(classID);
      const message = "Successful";
      res.status(200).json({ message, studentsInClass });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(err.statusCode).json({ message });
    }
  };

  removeTeachersInClass = async (req, res) => {
    try {
      const { classID, teachersEmail } = req.params;
      const removedTeachers = await ClassService.removeTeachersInClass(classID, teachersEmail);
      const teachersInClass = await ClassService.viewAllTeachersInClass(classID);
      const message = "Successful";
      res.status(200).json({ message, teachersInClass });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(err.statusCode).json({ message });
    }
  };
}

module.exports = new ClassController();
