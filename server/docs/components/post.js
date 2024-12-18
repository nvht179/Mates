module.exports =
{
  schemas: {
    "createPostWithAttachments": {
    "type": "object",
    "properties": {
      "classID": {
        "type": "integer",
        "description": "ID of the class"
      },
      "title": {
        "type": "string",
        "description": "Title of the post"
      },
      "content": {
        "type": "string",
        "description": "Content of the post"
      },
      "personID": {
        "type": "integer",
        "description": "ID of the person creating the post"
      }
    },
    "required": ["classID", "title", "content", "personID"]
  },
    "editPost": {
      "properties": {
        "title": {
          "type": "string",
          "example": "Updated Post Title",
          "description": "New title of the post"
        },
        "content": {
          "type": "string",
          "example": "Updated content for the post.",
          "description": "Updated content of the post"
        },
        "attachments": {
          "type": "array",
          "description": "Updated list of attachments for the post",
          "items": {
            "type": "object",
            "properties": {
              "link": {
                "type": "string",
                "example": "http://new-link.com",
                "description": "URL of the attachment"
              },
              "linkTitle": {
                "type": "string",
                "example": "New Attachment Title",
                "description": "Title of the attachment"
              }
            },
            "required": [
              "link",
              "linkTitle"
            ]
          }
        }
      },
      "required": [
        "title",
        "content"
      ],
      "description": "Schema for editing a post with optional attachments"
    },
    "Post": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "description": "Unique identifier for the post"
        },
        "title": {
          "type": "string",
          "description": "Title of the post"
        },
        "content": {
          "type": "string",
          "description": "Content of the post"
        },
        "classID": {
          "type": "integer",
          "description": "ID of the class the post belongs to"
        }
      },
      "required": [
        "id",
        "title",
        "content",
        "classID"
      ]
    }
  }
}