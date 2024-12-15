module.exports =
{
  "post": {
    "tags": [
      "Auth"
    ],
    "description": "Create an account",
    "summary": "Sign up",
    "parameters": [
      {
        "name": "user",
        "in": "body",
        "description": "Login details",
        "schema": {
          "$ref": "#/components/schemas/signUp"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Account created"
      }
    }
  }
}