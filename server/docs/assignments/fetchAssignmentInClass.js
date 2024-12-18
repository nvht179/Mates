module.exports={
    "get": {
        "tags": ["Assignments"],
        "summary": "Get all assignments in a class",
        "description": "Fetches all assignments for a specific class by its ID.",
        "operationId": "viewAllAssignmentsInClass",
        "parameters": [
          {
            "name": "classID",
            "in": "path",
            "description": "ID of the class to fetch assignments for",
            "required": true,
            "type": "integer"
          }
        ],
        "responses": {
          "200": {
            "description": "Assignments fetched successfully",
            "schema": {
              "type": "array",
              "items": {
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
                  }
                }
              }
            }
          },
          "404": {
            "description": "No assignments found for the given class"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    
}