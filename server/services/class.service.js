const ClassDB = require("../db/class.db");

class ClassService {
  createNewClass = async ({ className, code, description }) => {
    try {
      const newClass = await ClassDB.createNewClass({
        className,
        code,
        description,
      });
      if (!newClass) {
        throw new ErrorHandler(403, "Not exist assignment");
      }
      return newClass;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new ClassService();
