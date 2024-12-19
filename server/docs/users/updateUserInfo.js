module.exports = {
  "put": {
    "tags": [
      "Users"
    ],
    "description": "Update user info",
    "summary": "Update user info",
    "consumes": [
      "multipart/form-data"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "formData",
        "required": true,
        "description": "ID's user",
        "type": "string"
      },
      {
        "name": "email",
        "in": "formData",
        "required": false,
        "description": "New email of user",
        "type": "string",
        "nullable": true // Allow null value
      },
      {
        "name": "name",
        "in": "formData",
        "required": false,
        "description": "New name of user",
        "type": "string",
        "nullable": true // Allow null value
      },
      {
        "name": "phone",
        "in": "formData",
        "required": false,
        "description": "New phone of user",
        "type": "string",
        "nullable": true // Allow null value
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
        "description": "Update user info successfully"
      }
    }
  }
};
