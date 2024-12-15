module.exports =
{
  "post": {
    "tags": [
      "Posts"
    ],
    "description": "Create a post",
    "summary": "Create a post",
    "parameters": [
      {
        "name": "post",
        "in": "body",
        "description": "Create a post",
        "schema": {
          "$ref": "#/components/schemas/createPostWithAttachments"
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