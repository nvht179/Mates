const { P } = require("pino");
const ClassDB = require("../db/class.db");
const { ErrorHandler } = require("../helpers/error");

class ClassService {
  createNewClass = async ({ className, code, description }) => {
    try {
      const newClass = await ClassDB.createNewClass({
        className,
        code,
        description,
      });
      if (!newClass) {
        throw new ErrorHandler(403, "Can not create class");
      }
      return newClass;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  viewAllClasses = async () => {
    try {
      const allClasses = await ClassDB.viewAllClasses();
      if (!allClasses) {
        throw new ErrorHandler(403, "There are not exist classes");
      }
      return allClasses;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  }
}

module.exports = new ClassService();
