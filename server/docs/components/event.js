module.exports =
{
  schemas: {
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
          "format": "date-time",
          "example": "2024-12-25T10:00:00Z"
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