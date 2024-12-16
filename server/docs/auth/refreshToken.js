module.exports = {
  "post": {
    "tags": [
      "Auth"
    ],
    "description": "Refresh the JWT token",
    "summary": "Refresh the JWT token using the refresh token stored in cookies",
    "responses": {
      "200": {
        "description": "Tokens successfully refreshed",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "token": {
                  "type": "string",
                  "description": "The new access token"
                },
                "refreshToken": {
                  "type": "string",
                  "description": "The new refresh token"
                }
              }
            }
          }
        }
      },
      "401": {
        "description": "Unauthorized. Refresh token is missing or invalid."
      }
    }
  }
};
