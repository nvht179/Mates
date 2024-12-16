module.exports =
{
  "get": {
    "tags": [
      "Classes"
    ],
    security: [
      {
        JWT: [],
      },
    ],
    "description": "View all classes",
    "summary": "View all classes",
    "responses": {
      "200": {
        "description": "View all classes successfully"
      }
    }
  }
}