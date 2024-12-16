module.exports =
{
  "post": {
    "tags": [
      "Auth"
    ],
    "description": "Resend the verification link",
    "summary": "Resend the verification link",
    "parameters": [
      {
        "name": "user",
        "in": "body",
        "description": "Verfify the account",
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