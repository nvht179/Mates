const AssignmentDB = require("../db/assignment.db");
const { ErrorHandler } = require("../helpers/error");
const NotificationService = require("./notification.service");
const ClassService = require("./class.service");

class AssignmentService {
  // Add a new assignment with attachments
  addNewAssignmentWithAttachments = async ({ title, description, startTime, endTime, attachments, classID, weight }) => {
    try {
      // Check if an assignment with the same title already exists
      const existingAssignment = await AssignmentDB.getAssignmentByTitle(title);
      if (existingAssignment) {
        throw new ErrorHandler(403, "Assignment with the same title already exists");
      }

      // Call DB layer to create assignment with attachments
      const newAssignment = await AssignmentDB.addNewAssignmentWithAttachments({
        title,
        description,
        startTime,
        endTime,
        attachments,
        weight,
        classID
      });

      const postID = null;
      const type = "assignment";
      const notiTitle = "New assignment " + title;
      const commentID = null;
      const assignmentID = newAssignment.id;
      const content = description;

      // All members in class
      const studentClassInfo = await ClassService.viewAllStudentsInClass(classID);
      for (const student of studentClassInfo) {
        const userID = student.id;
        console.log("AssignmentService:", userID, postID, notiTitle, content, type, commentID, assignmentID)
        const notification = await NotificationService.notification(userID, postID, notiTitle, content, type, commentID, assignmentID);
      }

      const teacherClassInfo = await ClassService.viewAllTeachersInClass(classID);
      for (const teacher of teacherClassInfo) {
        const userID = teacher.id;
        const notification = await NotificationService.notification(userID, postID, notiTitle, content, type, commentID, assignmentID);
      }


      return newAssignment;
    } catch (err) {
      console.error(err);
      throw new ErrorHandler(err.status || 500, err.message || "Error creating assignment");
    }
  };

  // Get all assignments
  async getAssignments() {
    try {
      const assignments = await AssignmentDB.getAssignments();
      return assignments;
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Error in service layer while retrieving assignments: ${error.message}`
      );
    }
  }

  // Get assignment by ID
  async getAssignmentById(assignmentId) {
    try {
      const assignment = await AssignmentDB.getAssignmentById(assignmentId);
      if (!assignment) {
        throw new ErrorHandler(404, "Assignment not found");
      }
      return assignment;
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Error in service layer while retrieving assignment: ${error.message}`
      );
    }
  }

  // Edit an assignment
  async editAssignment({ assignmentId, title, description, startTime, endTime, attachments, weight }) {
    try {
      // Call DB layer to edit assignment and replace attachments
      const updatedAssignment = await AssignmentDB.editAssignment({
        assignmentId,
        title,
        description,
        startTime,
        endTime,
        attachments,
        weight,
      });

      return updatedAssignment;
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Error editing assignment in service: ${error.message}`
      );
    }
  }

  // Remove an assignment
  async removeAssignment(assignmentId) {
    try {
      const result = await AssignmentDB.removeAssignment(assignmentId);
      return result;
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Error removing assignment in service: ${error.message}`
      );
    }
  }

  async viewAllAssignmentsInClass(classID) {
    try {
      const assignments = await AssignmentDB.viewAllAssignmentsInClass(classID);

      return assignments;
    } catch (error) {
      throw new Error(`Error retrieving assignments in service: ${error.message}`);
    }
  }
}

module.exports = new AssignmentService();