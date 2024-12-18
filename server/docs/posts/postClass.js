module.exports =
{
  "get": {
        "tags": ["Posts"],
        "summary": "Get posts by classID",
        "description": "Fetch all posts by classID.",
        "operationId": "getPostsByClassId",
        "parameters": [
          {
            "name": "classID",
            "in": "path",
            "description": "The classID to fetch posts by",
            "required": true,
            "type": "integer"
          }
        ],
        "responses": {
          "200": {
            "description": "Posts retrieved successfully",
            "schema": {
              "type": "array",
              "items": {
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
                  "classID": {
                    "type": "integer"
                  },
                  "createdAt": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "updatedAt": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request, invalid classID"
          },
          "500": {
            "description": "Internal server error"
          }
        }
  }
}