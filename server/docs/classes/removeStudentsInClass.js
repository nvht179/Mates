module.exports = {
  delete: {
    tags: ['Classes'],
    description: 'Remove multiple students from a class by class ID',
    summary: 'Remove multiple students from a class',
    parameters: [
      {
        name: 'classID',
        in: 'path',
        description: 'The ID of the class',
        required: true,
        schema: {
          type: 'string',
          example: '1',
        },
      },
      {
        name: 'studentsEmail',
        in: 'path',
        description: 'Array of student emails to remove',
        required: true,
        schema: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email',
          },
          example: ['cucdaunho@gmail.com', 'lnkhoa22@apcs.fitus.edu.vn'],
        },
      },
    ],
    responses: {
      200: {
        description: 'Students removed from class successfully',
      },
      400: {
        description: 'Invalid input',
      },
      404: {
        description: 'Class or students not found',
      },
    },
  },
};
