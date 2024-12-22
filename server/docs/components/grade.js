module.exports =
{
  "schemas": {
    "gradeSubmission": {
      "type": "object",
      "properties": {
        "assignmentID": {
          "type": "string",
          "example": "1"
        },
        "personID": {
          "type": "string",
          "example": "1"
        },
        "grade100": {
          "type": "integer",
          "example": 50
        },
        "comment": {
          "type": "string",
          "example": "Nhu Chon"
        }
      },
      "required": ["assignmentID", "personID", "grade100"]
    }
  }
}
