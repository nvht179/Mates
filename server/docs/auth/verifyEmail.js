module.exports =
{
  "get": {
    "tags": [
      "Auth"
    ],
    "description": "Verify the sign up account",
    "summary": "Verify the sign up account",
    "parameters": [
      {
        "name": "user",
        "in": "body",
        "description": "Get the token",
        "schema": {
          "$ref": "#/components/schemas/login"
        }
      }
    ],
    "responses": {
      "200": {}
    }
  }
}