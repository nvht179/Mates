module.exports =
{
  schemas: {
    "AddComment": {
        "type": "object",
        "properties": {
            "content": {
            "type": "string",
            "example": "This is a new comment"
            },
            "postId": {
            "type": "integer",
            "example": 1
            },
            "personId": {
            "type": "integer",
            "example": 1
            }
        },
        "required": ["content", "postId", "personId"]
    },
    "Comment": {
        "type": "object",
        "properties": {
            "id": {
            "type": "integer",
            "example": 1
            },
            "content": {
            "type": "string",
            "example": "This is a new comment"
            },
            "postId": {
            "type": "integer",
            "example": 1
            },
            "personId": {
            "type": "integer",
            "example": 2
            }
        }
    },
  }
}