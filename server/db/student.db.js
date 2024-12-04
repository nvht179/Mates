const pool = require("../config/index.js");

const getAllStudentsDB = async () => {
  const students = await pool.query("SELECT * FROM student ORDER BY id");
  return { students: students };
};

module.exports = {
  getAllStudentsDB,
};
