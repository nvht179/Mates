module.exports = {
  "post": {
    "tags": [
      "Grades"
    ],
    "description": "Student submits assignment",
    "summary": "Student submits assignment",
    "consumes": [
      "multipart/form-data"
    ],
    "parameters": [
      {
        "name": "studentID",
        "in": "formData",
        "required": true,
        "description": "ID of the student",
        "type": "string"
      },
      {
        "name": "assignmentID",
        "in": "formData",
        "required": true,
        "description": "ID of the assignment",
        "type": "string"
      },
      {
        "name": "files",
        "in": "formData",
        "required": false,
        "description": "File to upload as an attachment",
        "type": "file"
      }
    ],
    "responses": {
      "200": {
        "description": "Student submits assignment successfully",
      }
    }
  }
}