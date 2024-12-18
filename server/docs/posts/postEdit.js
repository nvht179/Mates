module.exports =
{
  "put": {
        "tags": ["Posts"],
        "summary": "Edit an existing post",
        "description": "Edit the title, content, and attachments of a post by its ID.",
        "operationId": "editPost",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "description": "The postId of the post to edit",
            "required": true,
            "type": "integer"
          },
          {
            "name": "title",
            "in": "body",
            "description": "The new title for the post",
            "required": false,
            "type": "string"
          },
          {
            "name": "content",
            "in": "body",
            "description": "The new content for the post",
            "required": false,
            "type": "string"
          },
          {
            "name": "files",
            "in": "formData",
            "description": "Files to be uploaded with the post (attachments)",
            "required": false,
            "type": "array",
            "items": {
              "type": "file"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Post updated successfully with new attachments",
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                },
                "data": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer"
                    },
                    "title": {
                      "type": "string"
                    },
                    "content": {
                      "type": "string"
                    },
                    "attachments": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "link": {
                            "type": "string"
                          },
                          "linkTitle": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request, invalid postId or invalid data"
          },
          "403": {
            "description": "Forbidden, error occurred while editing post"
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