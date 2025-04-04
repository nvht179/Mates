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

  viewAllClasses = async (id) => {
    try {
      const user = await UserDB.getUserByIdDB(id);

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
        const info = await ClassDB.getInfoByID(classID);
        if (!info) {
          throw new ErrorHandler(404, "There are not exist classes");
        }
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
        const student = await UserDB.getUserByEmailDB(email)
        if (!student) {
          throw new ErrorHandler(403, "There is not exist student");
        }
        const studentClass = await ClassDB.addStudentsToClass(student.id, classID);

        studentsClass.push(studentClass);

        // Add to Event_Person table
        const newEvents = [];

        for (const eachEvent of events) {
          const personID = student.id;
          const eventID = eachEvent.eventID;
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
      for (const email of studentsEmail) {
        const removedStudent = await UserDB.getUserByEmailDB(email);
        if (!removedStudent) {
          throw new ErrorHandler(403, "There is not student");
        }
        const personID = removedStudent.id;
        const resultRemoved = await ClassDB.removeStudentInClass(classID, removedStudent.id);
        const events = await EventDB.getAllEventByClassID(classID);

        for (const event of events) {
          const eventID = event.eventID;
          await EventDB.removePersonEvent(eventID, personID);
        }
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
      for (const email of teachersEmail) {
        const removedTeacher = await UserDB.getUserByEmailDB(email);
        if (!removedTeacher) {
          throw new ErrorHandler(403, "There is not student");
        }
        const resultRemoved = await ClassDB.removeTeacherInClass(classID, removedTeacher.id);
        const personID = removedTeacher.id;
        const events = await EventDB.getAllEventByClassID(classID);
        for (const event of events) {
          const eventID = event.eventID;
          await EventDB.removePersonEvent(eventID, personID);
        }
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
      const classEvents = await EventDB.getAllEventByClassID(classID);
      if (!classInfo) {
        throw new ErrorHandler(403, "The class is not exist");
      }
      return { classInfo, classEvents };
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  editClassInfo = async (classID, className, code, description, events) => {
    try {
      const updatedClass = await ClassDB.editClassInfo(classID, className, code, description);
      if (!updatedClass) {
        throw new ErrorHandler(403, "Can not update class");
      }

      const allEventsClass = await EventDB.getAllEventByClassID(classID);
      const allMembersID = [];
      for (const eventClass of allEventsClass) {
        const eventID = eventClass.eventID;
        // Delete all the events of the students in that class
        const studentClassInfo = await this.viewAllStudentsInClass(classID);
        for (const student of studentClassInfo) {
          const personID = student.id;
          allMembersID.push(personID);
          await EventDB.removePersonEvent(eventID, personID);
        }

        // Delete all the events of the teachers in that class
        const teacherClassInfo = await this.viewAllTeachersInClass(classID);
        for (const teacher of teacherClassInfo) {
          const personID = teacher.id;
          allMembersID.push(personID);
          await EventDB.removePersonEvent(eventID, personID);
        }

        await EventDB.removeEvent(eventID);
      }

      const updatedEvents = [];
      for (const newEvent of events) {
        const { repeatTime, startTime, endTime } = newEvent;
        const title = className;
        // Create the event for class
        const event = await EventDB.createEventForClass(title, description, repeatTime, startTime, endTime, classID);
        const eventID = event.eventID;

        for (const memberID of allMembersID) {
          const personID = memberID;
          const event_person = await EventDB.addPersonToEvent(eventID, personID);
        }

        updatedEvents.push(event);
      }
      return { updatedClass, updatedEvents };
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  setAvatarClass = async (classID, publicURL, linkTitle) => {
    try {
      const avatarClass = await ClassDB.setAvatarClass(classID, publicURL, linkTitle);
      return avatarClass;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  removeClass = async (classID) => {
    try {
      // Remove student_class
      const studentClassInfo = await this.viewAllStudentsInClass(classID);
      const studentsEmail = []
      for (const student of studentClassInfo) {
        const emailStudent = student.email;
        studentsEmail.push(emailStudent);
      }
      const removedStudents = await this.removeStudentsInClass(classID, studentsEmail);

      // Remove teacher_class
      const teacherClassInfo = await this.viewAllTeachersInClass(classID);
      const teachersEmail = []
      for (const teacher of teacherClassInfo) {
        const emailTeacher = teacher.email;
        teachersEmail.push(emailTeacher);
      }
      const removedTeachers = await this.removeTeachersInClass(classID, teachersEmail);

      await EventDB.removeEventByClassID(classID);

      await ClassDB.removeClassByClassID(classID);
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new ClassService();