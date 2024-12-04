const { getAllStudentsDB } = require("../db/student.db");
const { ErrorHandler } = require("../helpers/error");

class StudentService {
  getAllStudents = async (data) => {
    try {
      return await getAllStudentsDB(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

module.exports = new StudentService();
