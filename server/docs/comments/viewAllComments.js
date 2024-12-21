module.exports = {
    "get": {
      "tags": [
        "Comments"
      ],
      "description": "View all comments in that class",
      "summary": "View all comments in that class",
      "parameters": [
        {
          "name": "postId",
          "in": "path",
          "required": true,
          "description": "Post's ID",
          "schema": {
            "type": "integer"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "View all comment in that class successfully",
        },
        "404": {
          "description": "comment not found"
        }
      }
    }
  };
  