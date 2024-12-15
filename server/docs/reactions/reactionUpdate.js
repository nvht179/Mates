module.exports =
{
  "put": {
    "tags": [
      "Reactions"
    ],
    "description": "Update a reaction by its ID",
    "summary": "Update reaction",
    "parameters": [
      {
        "name": "reaction",
        "in": "body",
        "description": "Reaction update details",
        "schema": {
          "$ref": "#/components/schemas/updateReaction"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Reaction updated successfully"
      },
      "400": {
        "description": "Invalid input or missing required parameters"
      },
      "404": {
        "description": "Reaction not found"
      }
    }
  }
}