module.exports = {
  "get": {
    "tags": [
      "Lectures"
    ],
    "description": "View all lectures in that class",
    "summary": "View all lectures in that class",
    "parameters": [
      {
        "name": "classID",
        "in": "path",
        "required": true,
        "description": "Class's ID",
        "schema": {
          "type": "string"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "View all lectures in that class successfully",
      },
      "404": {
        "description": "Lectures not found"
      }
    }
  }
};
