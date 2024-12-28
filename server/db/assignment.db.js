const Assignment = require("../entities/assignment.model");
const { ErrorHandler } = require("../helpers/error");
const AttachmentDB = require("./attachment.db");
const sequelize = require("../config/db");
const { Comment, Reaction, Person, Attachment, Grade } = require("../entities");
const GradeDB = require("./grade.db");
const ClassDB = require("./class.db");

class AssignmentDB {
  // Add new assignment with attachments
  addNewAssignmentWithAttachments = async ({ title, description, startTime, endTime, attachments,classID,weight }) => {
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
          classID,
          weight
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

    const studentsInClass = await ClassDB.viewAllStudentsInClass(classID);
    for (const student of studentsInClass) {
      await Grade.create({
        studentID: student.studentID,
        assignmentID: newAssignment.id, // Link to the new assignment
      }, { transaction });
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
  async editAssignment({ assignmentId, title, description, startTime, endTime, attachments,weight }) {
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
      if (!attachments || attachments.length == 0) {
        await AttachmentDB.removeAttachmentsByAssignmentId(assignmentId, { transaction });
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

      // Remove the associated grades by assignmentID
      await GradeDB.removeGradeByAssignmentID(assignmentId);

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
      // Query assignments with attachments
      const assignments = await Assignment.findAll({
        where: { classID },
        include: [
          {
            model: Attachment,
            as: 'attachments', 
            attributes: ['id', 'link', 'linkTitle'], 
          },
        ],
      });
  
      return assignments;
    } catch (err) {
      throw new Error(`Error fetching assignments: ${err.message}`);
    }
  }

  async getAssignmentByTitle(title) {
    return await Assignment.findOne({
      where: { title },
    });
  }

  // Method to add a new assignment with attachments
  async addNewAssignmentWithAttachments({ title, description, startTime, endTime, attachments, weight, classID }) {
    // Transaction logic for creating assignment and its attachments
    const newAssignment = await Assignment.create({
      title,
      description,
      startTime,
      endTime,
      weight,
      classID,
    });

    // Optionally handle adding attachments here
    return newAssignment;
  }

  getAllAssignmentsInClass = async (classID) => {
    const assignments = await Assignment.findAll({
      where: {
        classID: classID
     }
    });
    return assignments;
  };
}

module.exports = new AssignmentDB();