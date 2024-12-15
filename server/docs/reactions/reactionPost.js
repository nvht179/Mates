module.exports =
{
  "get": {
    "tags": [
      "Reactions"
    ],
    "description": "Get all reactions for a post",
    "summary": "Get reactions by class ID",
    "parameters": [
      {
        "name": "postId",
        "in": "path",
        "required": true,
        "type": "integer",
        "description": "The ID of the post to retrieve reactions for"
      }
    ],
    "responses": {
      "200": {
        "description": "A list of reactions for posts in the specified class",
        "schema": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/Reaction"
          }
        }
      },
      "400": {
        "description": "Invalid class ID supplied"
      },
      "404": {
        "description": "No reactions found for the specified class ID"
      }
    }
  }
}