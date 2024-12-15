module.exports =
{
  "delete": {
    "tags": [
      "Reactions"
    ],
    "description": "Delete a reaction by its ID",
    "summary": "Delete a reaction",
    "parameters": [
      {
        "name": "reaction",
        "in": "body",
        "description": "Reaction delete details",
        "schema": {
          "$ref": "#/components/schemas/deleteReaction"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Reaction deleted successfully",
        "schema": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Reaction deleted successfully"
            }
          }
        }
      },
      "404": {
        "description": "Reaction not found",
        "schema": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Reaction not found"
            }
          }
        }
      },
      "500": {
        "description": "Error deleting reaction",
        "schema": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Error deleting reaction"
            },
            "details": {
              "type": "string",
              "example": "Error details here"
            }
          }
        }
      }
    }
  }
}