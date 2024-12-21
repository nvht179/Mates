module.exports={
    "delete": {
        "tags": ["Assignments"],
        "summary": "Remove an assignment",
        "description": "Removes an existing assignment by its ID.",
        "operationId": "removeAssignment",
        "parameters": [
          {
            "name": "assignmentId",
            "in": "path",
            "description": "ID of the assignment to remove",
            "required": true,
            "type": "integer"
          }
        ],
        "responses": {
          "200": {
            "description": "Assignment removed successfully",
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