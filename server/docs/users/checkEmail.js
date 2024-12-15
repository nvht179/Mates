module.exports =
{
  "post": {
    "tags": [
      "Users"
    ],
    "description": "Check email exist",
    "summary": "Check email exist",
    "parameters": [
      {
        "name": "user",
        "in": "body",
        "description": "Email details",
        "schema": {
          $ref: "#/components/schemas/checkEmail"
        }
      }
    ],
    "responses": {
      "200": {}
    }
  }
}