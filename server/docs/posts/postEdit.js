module.exports =
{
  "put": {
    "tags": [
      "Posts"
    ],
    "description": "Edit an existing post",
    "summary": "Edit post",
    "parameters": [
      {
        "name": "postId",
        "in": "path",
        "required": true,
        "type": "integer",
        "description": "ID of the post to edit"
      },
      {
        "name": "post",
        "in": "body",
        "description": "Updated post details",
        "schema": {
          "$ref": "#/components/schemas/editPost"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Post updated successfully",
        "schema": {
          "$ref": "#/components/schemas/Post"
        }
      },
      "400": {
        "description": "Invalid input or missing parameters"
      },
      "404": {
        "description": "Post not found"
      },
      "500": {
        "description": "Internal server error"
      }
    }
  }
}