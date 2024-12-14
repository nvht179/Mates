const pool = require("../config/db");
const { Assignment } = require("../entities");
const {Attachment} = require('../entities');
const { ErrorHandler } = require("../helpers/error");
class AssignmentDB {
  
  addNewAssignment = async ({
    title,
    startTime,
    endTime,
    attachments,
    description,
  }) => {
    try{
        const newAssignment = await Assignment.create(
            {
                title,
                startTime,
                endTime,
                description,
                attachments
            },
              {
                include: [{ model: Attachment, as: "attachments" }], 
              }
        );
        return newAssignment;
    }
    
    catch (error){
        throw new ErrorHandler("assignmentDB error:", error);

    };
    }
}

module.exports = new AssignmentDB();

