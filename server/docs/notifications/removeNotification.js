module.exports = {
  "delete": {
    "tags": [
      "Lectures"
    ],
    "description": "Delete lecture with attachments",
    "summary": "Delete lecture with attachments",
    "parameters": [
      {
        "name": "lectureId",
        "in": "path",
        "required": true,
        "description": "Lecture's ID",
        "type": "integer",
      }
    ],
    "responses": {
      "200": {
        "description": "Delete lecture with attachments successfully",
      },
      "404": {
        "description": "Lectures not found"
      }
    }
  }
};
