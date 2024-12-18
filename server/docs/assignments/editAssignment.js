module.exports={
    "put": {
        "tags": ["Assignments"],
        "summary": "Edit an existing assignment",
        "description": "Updates an existing assignment, including optional new attachments.",
        "operationId": "editAssignment",
        "consumes": ["multipart/form-data"],
        "parameters": [
          {
            "name": "assignmentId",
            "in": "path",
            "description": "ID of the assignment to edit",
            "required": true,
            "type": "integer"
          },
          {
            "name": "title",
            "in": "formData",
            "description": "Updated title of the assignment",
            "required": false,
            "type": "string"
          },
          {
            "name": "description",
            "in": "formData",
            "description": "Updated description of the assignment",
            "required": false,
            "type": "string"
          },
          {
            "name": "startTime",
            "in": "formData",
            "description": "Updated start time of the assignment",
            "required": false,
            "type": "string",
            "format": "date-time"
          },
          {
            "name": "endTime",
            "in": "formData",
            "description": "Updated end time of the assignment",
            "required": false,
            "type": "string",
            "format": "date-time"
          },
          {
            "name": "files",
            "in": "formData",
            "description": "Updated attachments for the assignment",
            "required": false,
            "type": "file",
            "collectionFormat": "multi"
          }
        ],
        "responses": {
          "200": {
            "description": "Assignment updated successfully with new attachments",
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                },
                "data": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "startTime": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "endTime": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "attachments": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "link": {
                            "type": "string"
                          },
                          "linkTitle": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Assignment not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
}