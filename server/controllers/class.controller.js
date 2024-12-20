const ClassService = require("../services/class.service");

class ClassController {
  createNewClass = async (req, res) => {
    try {
      const { className, code, description, events, userID, role } = req.body;
      const { newClass, newEvents } = await ClassService.createNewClass({
        className,
        code,
        description,
        events,
        userID,
        role
      });
      const message = "Successful";
      res.status(200).json({ message, newClass, newEvents });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  viewAllClasses = async (req, res) => {
    try {
      const { email } = req.params;
      const allClassesInfo = await ClassService.viewAllClasses(email);
      const message = "Successful";
      res.status(200).json({ message, allClassesInfo });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
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
      res.status(403).json({ message });
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
      res.status(403).json({ message });
    }
  };

  viewAllStudentsInClass = async (req, res) => {
    try {
      const { classID } = req.params;
      const studentClassInfo = await ClassService.viewAllStudentsInClass(classID);
      const message = "Successful";
      res.status(200).json({ message, studentClassInfo });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  viewAllTeachersInClass = async (req, res) => {
    try {
      const { classID } = req.params;
      const teacherClassInfo = await ClassService.viewAllTeachersInClass(classID);
      const message = "Successful";
      res.status(200).json({ message, teacherClassInfo });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  viewClassInfo = async (req, res) => {
    try {
      const { classID } = req.params;
      const { classInfo, classEvents } = await ClassService.viewClassInfo(classID);
      const message = "Successful";
      res.status(200).json({ message, classInfo, classEvents });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  removeStudentsInClass = async (req, res) => {
    try {
      const { classID, studentsEmail } = req.body;
      const removedStudents = await ClassService.removeStudentsInClass(classID, studentsEmail);
      const studentsInClass = await ClassService.viewAllStudentsInClass(classID);
      const message = "Successful";
      res.status(200).json({ message, studentsInClass });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  removeTeachersInClass = async (req, res) => {
    try {
      const { classID, teachersEmail } = req.body;
      const removedTeachers = await ClassService.removeTeachersInClass(classID, teachersEmail);
      const teachersInClass = await ClassService.viewAllTeachersInClass(classID);
      const message = "Successful";
      res.status(200).json({ message, teachersInClass });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  editClassInfo = async (req, res) => {
    try {
      const { classID, className, code, description } = req.body;
      const updatedClass = await ClassService.editClassInfo(classID, className, code, description);
      const message = "Successful";
      res.status(200).json({ message, updatedClass });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  removeClass = async (req, res) => {
    try {
      const { classID } = req.params;
      const removedClass = await ClassService.removeClass(classID);
      const message = "Successful";
      res.status(200).json({ message });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };
}

module.exports = new ClassController();
