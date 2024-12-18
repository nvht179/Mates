module.exports = {
  "put": {
    "tags": [
      "Lectures"
    ],
    "description": "Edit lectures with mutiple attachments",
    "summary": "Edit lectures with mutiple attachments",
    "consumes": [
      "multipart/form-data"
    ],
    "parameters": [
      {
        "name": "lectureId",
        "in": "formData",
        "required": true,
        "description": "Lecture's ID",
        "type": "string"
      },
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
        "required": false,
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
        "required": false,
        "description": "File to upload as an attachment",
        "type": "file"
      }
    ],
    "responses": {
      "200": {
        "description": "Lecture edits successfully with attachments",
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
