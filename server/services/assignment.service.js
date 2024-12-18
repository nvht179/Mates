const AssignmentDB = require("../db/assignment.db");
const { ErrorHandler } = require("../helpers/error");

class AssignmentService {
  // Add a new assignment with attachments
  addNewAssignmentWithAttachments = async ({ title, description, startTime, endTime, attachments,classID }) => {
    try {
      // Call DB layer to create assignment with attachments
      const newAssignment = await AssignmentDB.addNewAssignmentWithAttachments({
        title,
        description,
        startTime,
        endTime,
        classID,
        attachments,
      });

      return newAssignment;
    } catch (err) {
      console.error(err);
      throw new ErrorHandler(
        500,
        `Error in creating assignment with attachments in service: ${err.message}`
      );
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
  async editAssignment({ assignmentId, title, description, startTime, endTime, attachments }) {
    try {
      // Call DB layer to edit assignment and replace attachments
      const updatedAssignment = await AssignmentDB.editAssignment({
        assignmentId,
        title,
        description,
        startTime,
        endTime,
        attachments,
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
      // Gọi DB để lấy tất cả assignment của lớp học với classID
      const assignments = await AssignmentDB.viewAllAssignmentsInClass(classID);

      return assignments;
    } catch (error) {
      throw new Error(`Error retrieving assignments in service: ${error.message}`);
    }
  }
}

module.exports = new AssignmentService();