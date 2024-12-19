const AssignmentService = require("../services/assignment.service");
const supabase = require("../config/supabase");

class AssignmentController {
  // Add a new assignment
  addNewAssignment = async (req, res) => {
    try {
      const { title, description, startTime, endTime,classID,weight } = req.body;

      if (!title) {
        throw new Error("Title is required");
      }
      if (!description) {
        throw new Error("Description is required");
      }

      // Handle file uploads and create attachments
      const attachments = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const filePath = `${Date.now()}_${file.originalname}`;
          const { data, error } = await supabase.storage
            .from("Attachments")
            .upload(filePath, file.buffer);

          if (error) {
            throw new Error(`File upload failed: ${error.message}`);
          }

          const { data: publicData, error: publicUrlError } = supabase.storage
            .from("Attachments")
            .getPublicUrl(filePath);

          if (publicUrlError) {
            throw new Error(`Error getting public URL: ${publicUrlError.message}`);
          }

          attachments.push({
            link: publicData.publicUrl,
            linkTitle: file.originalname,
          });
        }
      }

      // Call service to create assignment with attachments
      const newAssignment = await AssignmentService.addNewAssignmentWithAttachments({
        title,
        description,
        startTime,
        endTime,
        attachments,
        weight
      });

      res.status(200).json({
        message: "Assignment and attachments created successfully",
        data: newAssignment,
      });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  };

  // Edit an assignment
  editAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const { title, description, startTime, endTime, weight } = req.body;

      // Get the current assignment
      const currentAssignment = await AssignmentService.getAssignmentById(assignmentId);

      if (!currentAssignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      // Handle file uploads and create new attachments
      const attachments = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const filePath = `${Date.now()}_${file.originalname}`;
          const { data, error } = await supabase.storage
            .from("Attachments")
            .upload(filePath, file.buffer);

          if (error) {
            throw new Error(`File upload failed: ${error.message}`);
          }

          const { data: publicData, error: publicUrlError } = supabase.storage
            .from("Attachments")
            .getPublicUrl(filePath);

          if (publicUrlError) {
            throw new Error(`Error getting public URL: ${publicUrlError.message}`);
          }

          attachments.push({
            link: publicData.publicUrl,
            linkTitle: file.originalname,
          });
        }
      }

      // Call service to update assignment and replace attachments
      const updatedAssignment = await AssignmentService.editAssignment({
        assignmentId,
        title: title || currentAssignment.title,
        description: description || currentAssignment.description,
        startTime: startTime || currentAssignment.startTime,
        endTime: endTime || currentAssignment.endTime,
        weight: weight || currentAssignment.weight,
        attachments: attachments || currentAssignment.attachments
      });

      res.status(200).json({
        message: "Assignment updated successfully with new attachments",
        data: updatedAssignment,
      });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  };

  // Remove an assignment
  removeAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;

      // Call service to remove the assignment
      await AssignmentService.removeAssignment(assignmentId);

      res.status(200).json({
        message: "Assignment removed successfully",
      });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  };

  // Get an assignment by ID
  getAssignmentById = async (req, res) => {
    try {
      const { assignmentId } = req.params;

      // Call service to get assignment by ID
      const assignment = await AssignmentService.getAssignmentById(assignmentId);

      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }

      res.status(200).json({
        message: "Assignment found",
        data: assignment,
      });
    } catch (err) {
      res.status(403).json({ message: err.message });
    }
  };
  
  viewAllAssignmentsInClass = async (req, res) => {
    try {
      const { classID } = req.params; // Lấy classID từ params

      // Gọi service để lấy tất cả assignment trong lớp học
      const assignments = await AssignmentService.viewAllAssignmentsInClass(classID);

      if (!assignments || assignments.length === 0) {
        return res.status(404).json({ message: "No assignments found for this class" });
      }

      res.status(200).json({
        message: "Assignments found successfully",
        data: assignments,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AssignmentController();