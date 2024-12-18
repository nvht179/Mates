module.exports =
{
  schemas: {
    "updatedEvent": {
      "properties": {
        "eventID": {
          "type": "string",
          "example": "1"
        },
        "title": {
          "type": "string",
          "example": "Mates Class"
        },
        "description": {
          "type": "string",
          "example": "Mates Chon Chon"
        },
        "repeatTime": {
          "type": "string",
          "example": "Weekly"
        },
        "startTime": {
          "type": "string",
          "format": "date-time",
          "example": "2024-12-25T09:00:00Z"
        },
        "endTime": {
          "type": "string",
          "format": "date-time",
          "example": "2024-12-25T09:00:00Z"
        },
      }
    },
    "createEvent": {
      "properties": {
        "title": {
          "type": "string",
          "example": "Mates Class"
        },
        "description": {
          "type": "string",
          "example": "Mates Chon Chon"
        },
        "repeatTime": {
          "type": "string",
          "example": "Weekly"
        },
        "startTime": {
          "type": "string",
          "format": "date-time",
          "example": "2024-12-25T09:00:00Z"
        },
        "endTime": {
          "type": "string",
          "format": "date-time",
          "example": "2024-12-25T09:00:00Z"
        },
        "classID": {
          "type": "string",
          "example": "1"
        },
        "personID": {
          "type": "string",
          "example": "1"
        },
      }
    }
  }
}