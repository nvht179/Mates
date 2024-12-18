const { P } = require("pino");
const pool = require("../config/db");
const { Class, TeacherClass, StudentClass } = require("../entities/class.model");
const { Teacher, Student, Parent } = require("../entities/user.model");

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

  findClassByCode = async (code) => {
    const classInfo = await Class.findAll({
      where: {
        code: code
      }
    });
    return classInfo[0];
  };

  viewAllClasses = async () => {
    const allClasses = await Class.findAll();
    return allClasses;
  };

  viewAllClassesStudent = async (studentID) => {
    const allClasses = await StudentClass.findAll({
      where: {
        studentID: studentID
      }
    });
    return allClasses;
  };

  viewAllClassesTeacher = async (teacherID) => {
    const allClasses = await TeacherClass.findAll({
      where: {
        teacherID: teacherID
      }
    });
    return allClasses;
  };

  viewAllClassesParent = async (parentID) => {
    const studentID = await this.findChildID(parentID);
    const allClasses = await this.viewAllClassesStudent(studentID);
    return allClasses;
  };

  findChildID = async (parentID) => {
    const child = await Parent.findAll({
      where: {
        parentID: parentID
      }
    });
    const studentID = child[0].studentID;
    return studentID;
  };

  getInfoByID = async (classID) => {
    const classInfo = await Class.findByPk(classID);
    return classInfo;
  };

  addStudentsToClass = async (studentID, classID) => {
    const studentClass = await StudentClass.create({
      classID,
      studentID
    });
    return studentClass;
  };

  addTeachersToClass = async (teacherID, classID, role) => {
    console.log("ClassDB:", teacherID, classID, role)
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

