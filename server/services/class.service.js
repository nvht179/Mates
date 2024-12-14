const ClassDB = require("../db/class.db");

class ClassService {
    addNewClass = async ({
        name,
        code,
        description,
    }) => {
    try {
        const newClass = await ClassDB.addNewClass({
            name,
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
