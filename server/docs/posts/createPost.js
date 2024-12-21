module.exports = {
  "post": {
    "tags": [
      "Posts"
    ],
    "description": "Create a post with multiple attachments",
    "summary": "Create a post with multiple attachments",
    "consumes": [
      "multipart/form-data"
    ],
    "parameters": [
      {
        "name": "classID",
        "in": "formData",
        "required": true,
        "description": "Class ID",
        "type": "string"
      },
      {
        "name": "content",
        "in": "formData",
        "required": false,
        "description": "Content of the lecture",
        "type": "string"
      },
      {
        "name": "title",
        "in": "formData",
        "required": true,
        "description": "Nhap title",
        "type": "string"
      },
      {
        "name": "personID",
        "in": "formData",
        "required": true,
        "description": "Person ID",
        "type": "string"
      },
      {
        "name": "files",
        "in": "formData",
        "required": false,
        "description": "File to upload as an attachment",
        "type": "file"
      }
    ],
    "responses": {
      "200": {
        "description": "Lecture created successfully with attachments",
      },
      "400": {
        "description": "Bad request. Missing required fields or invalid file."
      },
      "403": {
        "description": "Unauthorized access or upload failed"
      }
    }
  }
}