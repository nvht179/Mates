const ClassDB = require("../db/class.db");
const UserDB = require("../db/user.db");
const EventDB = require("../db/event.db");
const { ErrorHandler } = require("../helpers/error");

class ClassService {
  createNewClass = async ({ className, code, description, events, userID, role }) => {
    try {
      const oldClass = await ClassDB.findClassByCode(code);
      if (oldClass) {
        throw new ErrorHandler(403, "There are exist classes");
      }

      const newClass = await ClassDB.createNewClass({
        className,
        code,
        description,
      });

      if (!newClass) {
        throw new ErrorHandler(403, "Can not create class");
      }

      const classID = newClass.classID;
      const title = className;
      const newEvents = [];

      for (const eachEvent of events) {
        const startTime = eachEvent.startTime;
        const endTime = eachEvent.endTime;
        const personID = userID;
        const repeatTime = eachEvent.repeatTime;
        const { event, event_person } = await EventDB.createEvent(title, description, repeatTime, startTime, endTime, classID, personID);
        newEvents.push(event);
      }

      const teacherClass = await ClassDB.addTeachersToClass(userID, classID, role);

      return { newClass, newEvents };
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

      const classesInfo = [];
      for (const classInfo of allClasses) {
        const classID = classInfo.classID;
        console.log("ClassService:", classID);
        const info = await ClassDB.getInfoByID(classID);
        if (!info) {
          throw new ErrorHandler(404, "There are not exist classes");
        }
        console.log("ClassService:", info);
        classesInfo.push(info);
      }

      return classesInfo;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  addStudentsToClass = async (classID, emailStudents) => {
    try {
      const events = await EventDB.getAllEventByClassID(classID);
      const studentsClass = [];
      const totalEvents = [];
      for (const email of emailStudents) {
        console.log("ClassService:", email)
        const student = await UserDB.getUserByEmailDB(email)
        if (!student) {
          throw new ErrorHandler(403, "There is not exist student");
        }
        console.log("ClassService:", student.id, classID)
        const studentClass = await ClassDB.addStudentsToClass(student.id, classID);

        studentsClass.push(studentClass);

        // Add to Event_Person table
        const newEvents = [];

        for (const eachEvent of events) {
          const personID = student.id;
          const eventID = eachEvent.eventID;
          console.log("PersonID", personID, "EventID", eventID);
          const event_person = await EventDB.addPersonToEvent(eventID, personID);
          newEvents.push(event_person);
        }
        totalEvents.push(newEvents);
      }
      return studentsClass;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  addTeachersToClass = async (classID, newTeachers) => {
    try {
      const teachersClass = []
      const events = await EventDB.getAllEventByClassID(classID);
      const totalEvents = [];

      for (const newTeacher of newTeachers) {
        const { teacherEmail, role } = newTeacher;
        const teacher = await UserDB.getUserByEmailDB(teacherEmail)
        if (!teacher) {
          throw new ErrorHandler(403, "There is not exist teacher");
        }
        const teacherClass = await ClassDB.addTeachersToClass(teacher.id, classID, role);
        teachersClass.push(teacherClass);

        // Add to Event_Person table
        const newEvents = [];

        for (const eachEvent of events) {
          const personID = teacher.id;
          const eventID = eachEvent.eventID;
          const event_person = await EventDB.addPersonToEvent(eventID, personID);
          newEvents.push(event_person);
        }
        totalEvents.push(newEvents);
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

      const studentClassInfo = [];
      for (const studentInClass of studentsInClass) {
        const id = studentInClass.studentID;
        console.log("ClassService:", id);
        const user = await UserDB.getUserByIdDB(id);
        const { email, name, phone, role, avatar } = user
        studentClassInfo.push({ id, email, name, phone, role, avatar });
      }

      return studentClassInfo;
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

      const teacherClassInfo = [];
      for (const teacherInClass of teachersInClass) {
        const id = teacherInClass.teacherID;
        console.log("ClassService:", id);
        const user = await UserDB.getUserByIdDB(id);
        const { email, name, phone, role, avatar } = user
        teacherClassInfo.push({ id, email, name, phone, role, avatar });
      }

      return teacherClassInfo;
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

  viewClassInfo = async (classID) => {
    try {
      const classInfo = await ClassDB.getInfoByID(classID);
      if (!classInfo) {
        throw new ErrorHandler(403, "The class is not exist");
      }
      return classInfo;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  editClassInfo = async (classID, className, code, description) => {
    try {
      const updatedClass = await ClassDB.editClassInfo(classID, className, code, description);
      if (!updatedClass) {
        throw new ErrorHandler(403, "Can not update class");
      }
      return updatedClass;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new ClassService();