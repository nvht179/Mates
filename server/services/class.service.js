const { P } = require("pino");
const ClassDB = require("../db/class.db");
const UserDB = require("../db/user.db");

const { ErrorHandler } = require("../helpers/error");
const { Class } = require("../entities");

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

  viewAllClasses = async (email) => {
    try {
      const user = await UserDB.getUserByEmailDB(email);

      if (!user) {
        throw new ErrorHandler(403, "User not found");
      }

      const role = user.role;
      let allClasses;
      if (role == "Student") {
        allClasses = await ClassDB.viewAllClassesStudent(user.id);
      }
      else if (role == "Teacher") {
        allClasses = await ClassDB.viewAllClassesTeacher(user.id);
      }
      else if (role == "Parent") {
        allClasses = await ClassDB.viewAllClassesParent(user.id);
      }

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

  viewAllStudentsInClass = async (classID) => {
    try {
      const studentsInClass = await ClassDB.viewAllStudentsInClass(classID);
      if (!studentsInClass) {
        throw new ErrorHandler(403, "There is not students in class");
      }
      return studentsInClass;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  viewAllTeachersInClass = async (classID) => {
    try {
      const teachersInClass = await ClassDB.viewAllTeachersInClass(classID);
      if (!teachersInClass) {
        throw new ErrorHandler(403, "There is not teachers in class");
      }
      return teachersInClass;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  removeStudentsInClass = async (classID, studentsEmail) => {
    try {
      const removedStudents = [];

      // Split the comma-separated string into an array
      if (typeof studentsEmail === 'string') {
        studentsEmail = studentsEmail.split(',');
      }

      for (const email of studentsEmail) {
        console.log("ClassService:", email)
        const removedStudent = await UserDB.getUserByEmailDB(email);
        if (!removedStudent) {
          throw new ErrorHandler(403, "There is not student");
        }
        const resultRemoved = ClassDB.removeStudentInClass(classID, removedStudent.id);
        removedStudents.push(resultRemoved);
      }
      return removedStudents;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  removeTeachersInClass = async (classID, teachersEmail) => {
    try {
      const removedTeachers = [];

      // Split the comma-separated string into an array
      if (typeof teachersEmail === 'string') {
        teachersEmail = teachersEmail.split(',');
      }

      for (const email of teachersEmail) {
        const removedTeacher = await UserDB.getUserByEmailDB(email);
        if (!removedTeacher) {
          throw new ErrorHandler(403, "There is not student");
        }
        const resultRemoved = ClassDB.removeTeacherInClass(classID, removedTeacher.id);
        removedTeachers.push(resultRemoved);
      }
      return removedTeachers;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new ClassService();