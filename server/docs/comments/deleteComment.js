module.exports =
{
  "delete": {
      "tags": ["Comments"],
      "summary": "Delete a comment by ID",
      "description": "Deletes an existing comment using its ID",
      "parameters": [
        {
          "name": "commentId",
          "in": "path",
          "required": true,
          "type": "integer",
          "description": "The ID of the comment to delete"
        }
      ],
      "responses": {
        "200": {
          "description": "Comment deleted successfully"
        }
      }
    }
}