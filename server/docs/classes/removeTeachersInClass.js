module.exports = {
  delete: {
    tags: ['Classes'],
    description: 'Remove multiple teachers from a class by class ID',
    summary: 'Remove multiple teachers from a class',
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
        name: 'teachersEmail',
        in: 'path',
        description: 'Array of teacher emails to remove',
        required: true,
        schema: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email',
          },
          example: ['meow@gmail.com'],
        },
      },
    ],
    responses: {
      200: {
        description: 'Teachers removed from class successfully',
      },
      400: {
        description: 'Invalid input',
      },
      404: {
        description: 'Class or teachers not found',
      },
    },
  },
};
