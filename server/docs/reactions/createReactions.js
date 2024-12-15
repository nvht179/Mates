module.exports =
{
  "post": {
    "tags": [
      "Reactions"
    ],
    "description": "Add a new reactions to a Post",
    "summary": "Add a new reactions to a Post",
    "parameters": [
      {
        "name": "reaction",
        "in": "body",
        "description": "Add a reaction",
        "schema": {
          "$ref": "#/components/schemas/createReactionToPost"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Create a post successfully"
      }
    }
  }
}