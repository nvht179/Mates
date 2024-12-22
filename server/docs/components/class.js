module.exports =
{
  schemas: {
    "removeTeacherInClass": {
      "type": "object",
      "properties": {
        "classID": {
          "type": "string",
          "example": "1"
        },
        "teachersEmail": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "email"
          },
          "example": [
            "cucdaunho@gmail.com",
            "lnkhoa22@apcs.fitus.edu.vn"
          ]
        }
      },
      "required": ["classID", "teachersEmail"]
    },
    "removeStudentInClass": {
      "type": "object",
      "properties": {
        "classID": {
          "type": "string",
          "example": "1"
        },
        "studentsEmail": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "email"
          },
          "example": [
            "cucdaunho@gmail.com",
            "lnkhoa22@apcs.fitus.edu.vn"
          ]
        }
      },
      "required": ["classID", "studentsEmail"]
    },
    "editClassInfo": {
      "type": "object",
      "properties": {
        "classID": {
          "type": "string",
          "example": "1"
        },
        "className": {
          "type": "string",
          "example": "NLP Chon"
        },
        "code": {
          "type": "string",
          "example": "CS400"
        },
        "description": {
          "type": "string",
          "example": "Meow Meow"
        },
        "events": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "eventID": {
                "type": "integer",
                "example": 16
              },
              "title": {
                "type": "string",
                "example": "test3"
              },
              "description": {
                "type": "string",
                "example": "Meow Meow"
              },
              "repeatTime": {
                "type": ["string", "null"],
                "example": "Bi-Weekly"
              },
              "startTime": {
                "type": "string",
                "format": "date-time",
                "example": "2024-12-25T09:00:00.000Z"
              },
              "endTime": {
                "type": "string",
                "format": "date-time",
                "example": "2024-12-25T11:00:00.000Z"
              }
            }
          }
        }
      }
    }
  },
  "createClass": {
    "properties": {
      "className": {
        "type": "string",
        "example": "Introduction to Software"
      },
      "code": {
        "type": "string",
        "example": "CS400"
      },
      "description": {
        "type": "string",
        "example": "Meow Meow"
      },
      "events": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "example": [
          {
            "startTime": "2024-12-25T09:00:00Z",
            "endTime": "2024-12-25T11:00:00Z"
          },
          {
            "startTime": "2025-01-05T10:00:00Z",
            "endTime": "2025-01-05T12:00:00Z"
          },
          {
            "startTime": "2025-02-10T14:00:00Z",
            "endTime": "2025-02-10T16:00:00Z"
          }
        ],
      },
      "userID": {
        "type": "string",
        "example": "1"
      },
      "role": {
        "type": "string",
        "example": "TA"
      },
    }
  },
  "addStudentToClass": {
    "properties": {
      "classID": {
        "type": "string",
        "example": "1"
      },
      "emailStudents": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "example": [
          "lnkhoa22@apcs.fitus.edu.vn",
          "cucdaunho@gmail.com"
        ]
      },
    }
  },
  "addTeacherToClass": {
    "properties": {
      "classID": {
        "type": "string",
        "example": "1"
      },
      "newTeachers": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "example": [
          {
            "teacherEmail": "meow@gmail.com",
            "role": "Teacher"
          },
          {
            "teacherEmail": "ddien01@gmail.com",
            "role": "TA"
          }
        ]
      }
    }
  }
}