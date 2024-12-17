module.exports =
{
  "post": {
    "tags": [
      "Auth"
    ],
    "description": "Check the email and send OTP",
    "summary": "Check the email and send OTP",
    "parameters": [
      {
        "name": "user",
        "in": "body",
        "description": "Get the token",
        "schema": {
          "$ref": "#/components/schemas/checkEmail"
        }
      }
    ],
    "responses": {
      "200": {}
    }
  }
}