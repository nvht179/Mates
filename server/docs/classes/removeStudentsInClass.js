module.exports = {
  delete: {
    tags: ['Classes'],
    description: 'Remove multiple students from a class by class ID',
    summary: 'Remove multiple students from a class',
    "parameters": [
      {
        "name": "classID",
        "in": "body",
        "schema": {
          "$ref": "#/components/schemas/removeStudentInClass"
        }
      }
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
