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
}

module.exports = new ClassDB();

