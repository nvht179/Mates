module.exports =
{
  "delete": {
        "tags": ["Posts"],
        "summary": "Remove a post",
        "description": "Delete a post by its ID",
        "operationId": "removePost",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "description": "The ID of the post to be removed",
            "required": true,
            "type": "integer"
          }
        ],
        "responses": {
          "200": {
            "description": "Post removed successfully",
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                }
              }
            }
          },
          "400": {
            "description": "Bad request, invalid postId"
          },
          "403": {
            "description": "Forbidden, error occurred while deleting post"
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