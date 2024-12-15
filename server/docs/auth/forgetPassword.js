module.exports =
{
  "put": {
    "tags": [
      "Auth"
    ],
    "description": "Forget password",
    "summary": "Change password",
    "parameters": [
      {
        "name": "user",
        "in": "body",
        "description": "Details",
        "schema": {
          "$ref": "#/components/schemas/forgetPassword"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Change password successfully"
      }
    }
  }
}