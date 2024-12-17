const { ErrorHandler } = require("../helpers/error");
const AssignmentService = require("../services/assignment.service")
class AssignmentController {
    addNewAssignment = async (req, res) => {
    try {
      const {
        title,
        startTime,
        endTime,
        attachmentIDs,
        description,
      } = req.body;
      const attachment = await AssignmentService.addNewAssignment({
        title,
        startTime,
        endTime,
        attachmentIDs,
        description,
      });
      res.status(200).json(attachment);
    } catch (err) {
      res.status(403).json(err.message);
    }
  };
}

module.exports = new AssignmentController();
