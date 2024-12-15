module.exports =
{
  "get": {
    "tags": [
      "Posts"
    ],
    "description": "Get all posts for a specific class by its ID",
    "summary": "Get posts by class ID",
    "parameters": [
      {
        "name": "classId",
        "in": "path",
        "required": true,
        "type": "integer",
        "description": "The ID of the class to retrieve posts for"
      }
    ],
    "responses": {
      "200": {
        "description": "A list of posts for the specified class",
        "schema": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/Post"
          }
        }
      },
      "404": {
        "description": "No posts found for the specified class ID"
      },
      "500": {
        "description": "Error retrieving posts",
        "schema": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Error retrieving posts"
            },
            "details": {
              "type": "string",
              "example": "Database connection failed"
            }
          }
        }
      }
    }
  }
}