const ClassService = require("../services/class.service");
class ClassController {
    addNewClass = async (req, res) => {
    try {
      const {
        name,
        code,
        description,
      } = req.body;
      const newClass = await ClassService.addNewClass({
        name,
        code,
        description,
      });
      res.status(200).json(newClass);
    } catch (err) {
      res.status(404).json(err.message);
    }
  };
}

module.exports = new ClassController();
