module.exports =
{
  "get": {
        "tags": ["Attachments"],
        "summary": "Get attachment by ID",
        "description": "Fetch a single attachment by its ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "integer",
            "description": "ID of the attachment"
          }
        ],
        "responses": {
          "200": {
            "description": "Attachment retrieved successfully",
            "schema": {
              "$ref": "#/components/schemas/Attachment"
            }
          }
        }
  }
}