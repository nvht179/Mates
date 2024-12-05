const { ErrorHandler } = require("../helpers/error");

const unknownEndpoint = (request, response) => {
  throw new ErrorHandler(401, "unknown endpoint");
};

module.exports = unknownEndpoint;
