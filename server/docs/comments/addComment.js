module.exports =
{
  "post": {
      "tags": ["Comments"],
      "summary": "Add a comment to a post",
      "description": "Creates a new comment and associates it with a specific post",
      "parameters": [
        {
          "name": "body",
          "in": "body",
          "required": true,
          "description": "Comment data",
          "schema": {
            "$ref": "#/components/schemas/AddComment"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Comment added successfully",
          "schema": {
            "$ref": "#/components/schemas/Comment"
          }
        }
      }
    }
}