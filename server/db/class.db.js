const pool = require("../config/db");
const { Class, TeacherClass, StudentClass } = require("../entities/class.model");

const { ErrorHandler } = require("../helpers/error");

class ClassDB {
  createNewClass = async ({ className, code, description }) => {
    const newClass = await Class.create({
      className,
      code,
      description,
    });
    return newClass;
  };

  viewAllClasses = async () => {
    const allClasses = await Class.findAll();
    return allClasses;
  };

  addStudentsToClass = async (studentID, classID) => {
    const studentClass = await StudentClass.create({
      classID,
      studentID
    });
    return studentClass;
  };

  addTeachersToClass = async (teacherID, classID, role) => {
    const teacherClass = await TeacherClass.create({
      classID,
      teacherID,
      role
    });
    return teacherClass;
  };

  viewAllStudentsInClass = async (classID) => {
    const studentsInClass = await StudentClass.findAll({
      where: {
        classID: classID
      },
    });
    return studentsInClass;
  };

  viewAllTeachersInClass = async (classID) => {
    const teachersInClass = await TeacherClass.findAll({
      where: {
        classID: classID
      },
    });
    return teachersInClass;
  };

  removeStudentInClass = async (classID, studentID) => {
    const result = await StudentClass.destroy({
      where: {
        classID: classID,
        studentID: studentID,
      },
    });
    return result;
  };

  removeTeacherInClass = async (classID, teacherID) => {
    const result = await TeacherClass.destroy({
      where: {
        classID: classID,
        teacherID: teacherID,
      },
    });
    return result;
  };
}

module.exports = new ClassDB();

