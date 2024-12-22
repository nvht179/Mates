module.exports = {
  schemas: {
    removeTeacherInClass: {
      type: "object",
      properties: {
        classID: {
          type: "string",
          example: "1",
        },
        teachersEmail: {
          type: "array",
          items: {
            type: "string",
            format: "email",
          },
          example: [
            "cucdaunho@gmail.com",
            "lnkhoa22@apcs.fitus.edu.vn",
          ],
        },
      },
      required: ["classID", "teachersEmail"],
    },
    removeStudentInClass: {
      type: "object",
      properties: {
        classID: {
          type: "string",
          example: "1",
        },
        studentsEmail: {
          type: "array",
          items: {
            type: "string",
            format: "email",
          },
          example: [
            "cucdaunho@gmail.com",
            "lnkhoa22@apcs.fitus.edu.vn",
          ],
        },
      },
      required: ["classID", "studentsEmail"],
    },
    editClassInfo: {
      type: "object",
      properties: {
        classID: {
          type: "string",
          example: "1",
        },
        className: {
          type: "string",
          example: "NLP Chon",
        },
        code: {
          type: "string",
          example: "CS400",
        },
        description: {
          type: "string",
          example: "Meow Meow",
        },
        events: {
          type: "array",
          items: {
            type: "object",
            properties: {
              repeatTime: {
                type: ["string", "null"],
                example: "Bi-Weekly",
              },
              startTime: {
                type: "string",
                format: "date-time",
                example: "2024-12-25T09:00:00.000Z",
              },
              endTime: {
                type: "string",
                format: "date-time",
                example: "2024-12-25T11:00:00.000Z",
              },
            },
          },
        },
      },
    },
    createClass: {
      type: "object",
      properties: {
        className: {
          type: "string",
          example: "Introduction to Software",
        },
        code: {
          type: "string",
          example: "CS400",
        },
        description: {
          type: "string",
          example: "Meow Meow",
        },
        events: {
          type: "array",
          items: {
            type: "object",
            properties: {
              startTime: {
                type: "string",
                format: "date-time",
                example: "2024-12-25T09:00:00Z",
              },
              endTime: {
                type: "string",
                format: "date-time",
                example: "2024-12-25T11:00:00Z",
              },
            },
          },
        },
        userID: {
          type: "string",
          example: "1",
        },
        role: {
          type: "string",
          example: "TA",
        },
      },
    },
    addStudentToClass: {
      type: "object",
      properties: {
        classID: {
          type: "string",
          example: "1",
        },
        emailStudents: {
          type: "array",
          items: {
            type: "string",
          },
          example: [
            "lnkhoa22@apcs.fitus.edu.vn",
            "cucdaunho@gmail.com",
          ],
        },
      },
    },
    addTeacherToClass: {
      type: "object",
      properties: {
        classID: {
          type: "string",
          example: "1",
        },
        newTeachers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              teacherEmail: {
                type: "string",
                format: "email",
                example: "meow@gmail.com",
              },
              role: {
                type: "string",
                example: "Teacher",
              },
            },
          },
        },
      },
    },
  },
};
