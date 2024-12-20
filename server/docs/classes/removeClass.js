module.exports =
{
  "delete": {
    "tags": [
      "Classes"
    ],
    "parameters": [
      {
        "name": "classID",
        "in": "path",
        "description": "The id of class",
        "required": true,
        "schema": {
          "type": "string",
          "example": "1"
        }
      }
    ],
    "description": "Remove class",
    "summary": "Remove class",
    "responses": {
      "200": {
        "description": "Remove class successfully"
      }
    }
  }
}