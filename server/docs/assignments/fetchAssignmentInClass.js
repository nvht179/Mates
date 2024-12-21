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
          },
          "404": {
            "description": "No assignments found for the given class"
          },
        }
      }
    
}