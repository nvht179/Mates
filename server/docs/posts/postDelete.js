module.exports =
{
  "delete": {
    "tags": [
      "Posts"
    ],
    "description": "Delete a post by its ID",
    "summary": "Remove a post",
    "parameters": [
      {
        "name": "postId",
        "in": "path",
        "required": true,
        "type": "integer",
        "description": "ID of the post to remove"
      }
    ],
    "responses": {
      "200": {
        "description": "Post removed successfully",
        "schema": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Post deleted successfully"
            }
          }
        }
      },
      "404": {
        "description": "Post not found",
        "schema": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Post not found"
            }
          }
        }
      },
      "500": {
        "description": "Error deleting post",
        "schema": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Error deleting post"
            },
            "details": {
              "type": "string",
              "example": "Error details here"
            }
          }
        }
      }
    }
  }
}