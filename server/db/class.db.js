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
}

module.exports = new ClassDB();

