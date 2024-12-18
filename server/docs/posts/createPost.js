module.exports = {
  "post": {
    "tags": [
      "Posts"
    ],
    "description": "Create a post with multiple attachments",
    "summary": "Create a post with multiple attachments",
    "parameters": [
      {
        "name": "post",
        "in": "body",
        "description": "Create a post with attachments",
        "required": true,
        "schema": {
          "$ref": "#/components/schemas/createPostWithAttachments"
        }
      },
      {
        "name": "files",
        "in": "formData",
        "description": "Files to be uploaded with the post",
        "required": false,
        "type": "array",
        "collectionFormat": "multi",
        "items": {
          "type": "file"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Create a post successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                },
                "data": {
                  "type": "object"
                }
              }
            }
          }
        }
      },
      "400": {
        "description": "Bad request, missing required fields or invalid file format"
      },
      "500": {
        "description": "Server error"
      }
    }
  }
}