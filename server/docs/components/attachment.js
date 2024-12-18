module.exports =
{
  schemas: {
    "AddAttachment": {
      "type": "object",
      "properties": {
        "link": {
          "type": "string",          
        },
        "linkTitle": {
          "type": "string"
        },
        "assignmentId": {
          "type": "integer",
          "nullable": true
        },
        "postId": {
          "type": "integer",
          "nullable": true
        }
      },
      "required": ["link"]
    },
    "EditAttachments": {
      "type": "object",
      "properties": {
        "postId": {
          "type": "integer"
        },
        "attachments": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/AddAttachment"
          }
        }
      },
      "required": ["postId", "attachments"]
    },
    "Attachment": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer"
        },
        "link": {
          "type": "string"
        },
        "linkTitle": {
          "type": "string"
        },
        "assignmentId": {
          "type": "integer",
          "nullable": true
        },
        "postId": {
          "type": "integer",
          "nullable": true
        }
      }
    },
  }
}