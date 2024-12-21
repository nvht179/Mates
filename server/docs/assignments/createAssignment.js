module.exports =
{
"post": {
        "tags": ["Assignments"],
        "summary": "Create a new assignment with attachments",
        "description": "Creates a new assignment with optional file attachments.",
        "operationId": "addNewAssignment",
        "consumes": ["multipart/form-data"],
        "parameters": [
          {
            "name": "title",
            "in": "formData",
            "description": "Title of the assignment",
            "required": true,
            "type": "string"
          },
          {
            "name": "description",
            "in": "formData",
            "description": "Description of the assignment",
            "required": true,
            "type": "string"
          },
          {
            "name": "classID",
            "in": "formData",
            "description": "class id",
            "required": true,
            "type": "integer"
          },
          {
            "name": "weight",
            "in": "formData",
            "description": "weight",
            "required": true,
            "type": "integer"
          },
          {
            "name": "startTime",
            "in": "formData",
            "description": "Start time of the assignment",
            "required": true,
            "type": "string",
            "format": "date-time"
          },
          {
            "name": "endTime",
            "in": "formData",
            "description": "End time of the assignment",
            "required": true,
            "type": "string",
            "format": "date-time"
          },
          {
            "name": "files",
            "in": "formData",
            "description": "Attachments for the assignment",
            "required": false,
            "type": "file",
            "collectionFormat": "multi"
          }
        ],
        "responses": {
          "200": {
            "description": "Assignment and attachments created successfully",
          },
          "400": {
            "description": "Bad request. Missing required fields."
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
}