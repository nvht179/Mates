const submitAssignment = require("./submitAssignment");

module.exports = {
  "/grades/submit-assignment": {
    ...submitAssignment
  },
};