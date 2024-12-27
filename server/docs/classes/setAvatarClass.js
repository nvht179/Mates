module.exports = {
  "put": {
    "tags": [
      "Classes"
    ],
    "description": "Set avatar class",
    "summary": "Set avatar class",
    "consumes": [
      "multipart/form-data"
    ],
    "parameters": [
      {
        "name": "classID",
        "in": "formData",
        "required": true,
        "description": "ID's class",
        "type": "string"
      },
      {
        "name": "file",
        "in": "formData",
        "required": false,
        "description": "Upload file for avatar",
        "type": "file"
      }
    ],
    "responses": {
      "200": {
        "description": "Set avatar class successfully"
      }
    }
  }
};
