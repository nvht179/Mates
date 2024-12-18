const Assignment = require("../entities/assignment.model");
const { ErrorHandler } = require("../helpers/error");
const AttachmentDB = require("./attachment.db");
const sequelize = require("../config/db");

class AssignmentDB {
  // Add new assignment with attachments
  addNewAssignmentWithAttachments = async ({ title, description, startTime, endTime, attachments,classID }) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Create the new assignment
      const newAssignment = await Assignment.create(
        {
          title,
          description,
          startTime,
          endTime,
          classID
        },
        { transaction }
      );

      // If there are attachments, add them
      if (attachments && attachments.length > 0) {
        for (let attachment of attachments) {
          await AttachmentDB.addAttachment(
            {
              link: attachment.link,
              linkTitle: attachment.linkTitle,
              assignmentId: newAssignment.id, // Link to the new assignment
            },
            { transaction }
          );
        }
      }

      // Commit the transaction
      await transaction.commit();
      return newAssignment;
    } catch (error) {
      if (transaction) await transaction.rollback(); // Rollback on error
      throw new ErrorHandler("Error creating assignment with attachments", error);
    }
  };

  // Get all assignments
  async getAssignments() {
    try {
      const assignments = await Assignment.findAll();
      return assignments;
    } catch (error) {
      throw new ErrorHandler(500, "Error retrieving assignments", error);
    }
  }

  // Get assignment by ID
  async getAssignmentById(assignmentId) {
    try {
      const assignment = await Assignment.findByPk(assignmentId);
      if (!assignment) {
        throw new ErrorHandler(404, "Assignment not found");
      }
      return assignment;
    } catch (error) {
      throw new ErrorHandler(500, "Error retrieving assignment", error);
    }
  }

  // Edit an assignment
  async editAssignment({ assignmentId, title, description, startTime, endTime, attachments }) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Find the assignment to edit
      const assignment = await Assignment.findByPk(assignmentId);
      if (!assignment) {
        throw new ErrorHandler(404, "Assignment not found");
      }

      // Update assignment details
      await assignment.update({ title, description, startTime, endTime }, { transaction });

      // Handle updating attachments
      if (attachments && attachments.length > 0) {
        // Remove old attachments
        await AttachmentDB.removeAttachmentsByAssignmentId(assignmentId, { transaction });

        // Add new attachments
        for (let attachment of attachments) {
          await AttachmentDB.addAttachment(
            {
              link: attachment.link,
              linkTitle: attachment.linkTitle,
              assignmentId: assignmentId, // Link to the existing assignment
            },
            { transaction }
          );
        }
      }

      await transaction.commit();
      return assignment;
    } catch (error) {
      if (transaction) await transaction.rollback(); // Rollback on error
      throw new ErrorHandler("Error editing assignment", error);
    }
  }

  // Remove an assignment
  async removeAssignment(assignmentId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Find the assignment to remove
      const assignment = await Assignment.findByPk(assignmentId);
      if (!assignment) {
        throw new ErrorHandler(404, "Assignment not found");
      }

      // Remove associated attachments
      await AttachmentDB.removeAttachmentsByAssignmentId(assignmentId, { transaction });

      // Remove the assignment itself
      await assignment.destroy({ transaction });

      await transaction.commit();
      return { message: "Assignment deleted successfully" };
    } catch (error) {
      if (transaction) await transaction.rollback(); // Rollback on error
      throw new ErrorHandler("Error removing assignment", error);
    }
  }
   
  async viewAllAssignmentsInClass(classID) {
    try {
      // Truy vấn tất cả assignments của lớp học với classID
      const assignments = await Assignment.findAll({
        where: { classID },
      });

      return assignments;
    } catch (error) {
      throw new ErrorHandler(500, `Error retrieving assignments from DB: ${error.message}`);
    }
  }
}

module.exports = new AssignmentDB();