module.exports = {
  delete: {
    tags: ['Classes'],
    description: 'Remove multiple teachers from a class by class ID',
    summary: 'Remove multiple teachers from a class',
    "parameters": [
      {
        "name": "classID",
        "in": "body",
        "schema": {
          "$ref": "#/components/schemas/removeTeacherInClass"
        }
      }
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
