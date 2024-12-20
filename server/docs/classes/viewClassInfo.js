module.exports =
{
  "get": {
    "tags": [
      "Classes"
    ],
    "description": "View class info by classID",
    "summary": "View class info by classID",
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
    "responses": {
      "200": {
        "description": "View class info by classID successfully"
      }
    }
  }
}