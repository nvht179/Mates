module.exports =
{
  "post": {
    "tags": [
      "Classes"
    ],
    "description": "Create a class",
    "summary": "Create a class",
    "parameters": [
      {
        "name": "class",
        "in": "body",
        "description": "Create a class",
        "schema": {
          "$ref": "#/components/schemas/createClass"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Create a class successfully"
      }
    }
  }
}