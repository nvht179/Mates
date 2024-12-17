module.exports = {
  "post": {
    "tags": [
      "Lectures"
    ],
    "description": "Create a lecture with mutiple attachments file",
    "summary": "Create lecture with mutiple attachments",
    "consumes": [
      "multipart/form-data"
    ],
    "parameters": [
      {
        "name": "title",
        "in": "formData",
        "required": true,
        "description": "Title of the lecture",
        "type": "string"
      },
      {
        "name": "content",
        "in": "formData",
        "required": true,
        "description": "Content of the lecture",
        "type": "string"
      },
      {
        "name": "classID",
        "in": "formData",
        "required": true,
        "description": "ID of the class",
        "type": "string"
      },
      {
        "name": "files",
        "in": "formData",
        "required": true,
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
};
