module.exports =
{
  schemas: {
    "createReactionToPost": {
      "properties": {
        "personId": {
          "type": "integer",
          "example": 1
        },
        "type": {
          "type": "string",
          "example": "love"
        },
        "postId": {
          "type": "integer",
          "example": "6"
        }
      }
    },
    "updateReaction": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "example": 5,
          "description": "ID of the reaction to update"
        },
        "newType": {
          "type": "string",
          "example": "like",
          "description": "The new type of reaction (e.g., 'like', 'love', 'haha')"
        }
      },
      "required": [
        "id",
        "newType"
      ],
      "description": "Schema for updating a reaction"
    },
    "deleteReaction": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "example": 4,
          "description": "The ID of the reaction to delete"
        }
      },
      "required": [
        "id"
      ],
      "description": "Schema for deleting a reaction"
    },
    "Reaction": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "description": "Unique identifier for the reaction"
        },
        "personId": {
          "type": "integer",
          "description": "ID of the person who reacted"
        },
        "type": {
          "type": "string",
          "description": "Type of the reaction (e.g., 'like', 'dislike')"
        },
        "postId": {
          "type": "integer",
          "description": "ID of the post the reaction belongs to"
        }
      },
      "required": [
        "id",
        "personId",
        "postId"
      ]
    }
  }
}