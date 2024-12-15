const ClassService = require("../services/class.service");
class ClassController {
  createNewClass = async (req, res) => {
    try {
      const { className, code, description } = req.body;
      const newClass = await ClassService.createNewClass({
        className,
        code,
        description,
      });
      res.status(200).json(newClass);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };
}

module.exports = new ClassController();
