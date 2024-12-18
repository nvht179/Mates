module.exports =
{
"post": {
        "tags": ["Attachments"],
        "summary": "Create a new attachment",
        "description": "Upload a new file as an attachment and save data to the database.",
        "operationId": "addAttachment",
        "consumes": [
          "multipart/form-data"
        ],
        "parameters": [
          {
            "name": "linkTitle",
            "in": "formData",
            "description": "The title for the attachment link",
            "required": true,
            "type": "string"
          },
          {
            "name": "assignmentId",
            "in": "formData",
            "description": "The assignment ID associated with the attachment",
            "required": false,
            "type": "integer"
          },
          {
            "name": "postId",
            "in": "formData",
            "description": "The post ID that this attachment will be associated with",
            "required": true,
            "type": "integer"
          },
          {
            "name": "file",
            "in": "formData",
            "description": "The file to be uploaded as an attachment",
            "required": true,
            "type": "file"
          }
        ],
        "responses": {
          "200": {
            "description": "Attachment created successfully",
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                },
                "data": {
                  "type": "object",
                  "properties": {
                    "link": {
                      "type": "string"
                    },
                    "linkTitle": {
                      "type": "string"
                    },
                    "assignmentId": {
                      "type": "integer"
                    },
                    "postId": {
                      "type": "integer"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request, invalid input or file not uploaded"
          },
          "403": {
            "description": "Forbidden, error occurred while creating attachment"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
}