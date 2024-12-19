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
        "required": true,
        "description": "New email of user",
        "type": "string"
      },
      {
        "name": "name",
        "in": "formData",
        "required": true,
        "description": "New name of user",
        "type": "string"
      },
      {
        "name": "phone",
        "in": "formData",
        "required": true,
        "description": "New phone of user",
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
        "description": "Update user info successfully",
      }
    }
  }
};
