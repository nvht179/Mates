module.exports =
{
  schemas: {
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
        }
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
        }
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
}