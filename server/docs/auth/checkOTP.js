module.exports =
{
  "post": {
    "tags": [
      "Auth"
    ],
    "description": "Check OTP",
    "summary": "Check OTP",
    "parameters": [
      {
        "name": "user",
        "in": "body",
        "description": "Details",
        "schema": {
          "$ref": "#/components/schemas/checkOTP"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Check OTP successfully"
      }
    }
  }
}