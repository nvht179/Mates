module.exports =
{
  "put": {
    "tags": [
      "Comments"
    ],
    "description": "Edit comment",
    "summary": "Edit comment",
    "parameters": [
      {
        "name": "id",
        "in": "body",
        "schema": {
          "$ref": "#/components/schemas/editComment"
        }
      },
      {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "ID of the comment to be edited",
            "schema": {
              "type": "integer",
              "example": 1
            }
      }
    ],
    "responses": {
      "200": {
        "description": "Edit comment successfully"
      }
    }
  }
}