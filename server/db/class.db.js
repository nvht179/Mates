const pool = require("../config/db");
const Class = require("../entities/class.model");

const { ErrorHandler } = require("../helpers/error");
class ClassDB {
  
  addNewClass = async ({
    name,
    code,
    description,
  }) => {
    try{
        const newClass = await Class.create(
            {
                name,
                code,
                description,
            },
        );
        return newClass;
    }
    
    catch (error){
        throw new ErrorHandler("assignmentDB error:", error);

    };
    }
}

module.exports = new ClassDB();

