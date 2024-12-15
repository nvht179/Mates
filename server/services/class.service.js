const { P } = require("pino");
const ClassDB = require("../db/class.db");
const UserDB = require("../db/user.db");

const { ErrorHandler } = require("../helpers/error");

class ClassService {
  createNewClass = async ({ className, code, description }) => {
    try {
      const newClass = await ClassDB.createNewClass({
        className,
        code,
        description,
      });
      if (!newClass) {
        throw new ErrorHandler(403, "Can not create class");
      }
      return newClass;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  viewAllClasses = async () => {
    try {
      const allClasses = await ClassDB.viewAllClasses();
      if (!allClasses) {
        throw new ErrorHandler(403, "There are not exist classes");
      }
      return allClasses;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  }

  addStudentsToClass = async (classID, emailStudents) => {
    try {
      const studentsClass = []
      for (const email of emailStudents) {
        const student = await UserDB.getUserByEmailDB(email)
        if (!student) {
          throw new ErrorHandler(403, "There is not exist student");
        }
        const studentClass = await ClassDB.addStudentsToClass(student.id, classID);
        studentsClass.push(studentClass);
      }
      return studentsClass;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  addTeachersToClass = async (classID, newTeachers) => {
    try {
      const teachersClass = []
      for (const newTeacher of newTeachers) {
        const { teacherEmail, role } = newTeacher;
        const teacher = await UserDB.getUserByEmailDB(teacherEmail)
        if (!teacher) {
          throw new ErrorHandler(403, "There is not exist teacher");
        }
        const teacherClass = await ClassDB.addTeachersToClass(teacher.id, classID, role);
        teachersClass.push(teacherClass);
      }
      return teachersClass;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new ClassService();