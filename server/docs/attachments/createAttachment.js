module.exports =
{
  "post": {
        "tags": ["Attachments"],
        "summary": "Create a new attachment",
        "description": "Adds a new attachment to a post or assignment",
        "parameters": [
          {
            "name": "attachment",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/AddAttachment"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Attachment created successfully",
            "schema": {
              "$ref": "#/components/schemas/Attachment"
            }
          }
        }
  }
}