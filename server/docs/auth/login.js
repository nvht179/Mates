module.exports =
{
  "post": {
    "tags": [
      "Auth"
    ],
    "description": "Login into the system",
    "summary": "Login",
    "parameters": [
      {
        "name": "user",
        "in": "body",
        "description": "Login details",
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