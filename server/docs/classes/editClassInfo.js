module.exports =
{
  "put": {
    "tags": [
      "Classes"
    ],
    "description": "Edit class Info",
    "summary": "Edit class Info",
    "parameters": [
      {
        "name": "classID",
        "in": "body",
        "schema": {
          "$ref": "#/components/schemas/editClassInfo"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Edit class Info successfully"
      }
    }
  }
}