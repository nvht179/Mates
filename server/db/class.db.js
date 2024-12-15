const pool = require("../config/db");
const Class = require("../entities/class.model");

const { ErrorHandler } = require("../helpers/error");

class ClassDB {
  createNewClass = async ({ className, code, description }) => {
    const newClass = await Class.create({
      className,
      code,
      description,
    });
    return newClass;
  };
  viewAllClasses = async () => {
    const allClasses = await Class.findAll();
    return allClasses;
  };
}

module.exports = new ClassDB();

