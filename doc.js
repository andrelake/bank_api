export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'Simple example of a Bank API with a few operations',
    version: '1.0.0',
    title: 'Bank API',
  },
  host: 'localhost:3030',
  tags: [
    {
      name: 'account',
      description: 'Account management',
    },
  ],
  paths: {
    '/account': {
      post: {
        tags: ['account'],
        summary: 'Add a new account',
        description: 'Create a new account with received parameters',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account object',
            required: true,
            schema: {
              $ref: '#/definitions/Account',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Account created',
          },
          '400': {
            description: 'Error ocurred',
          },
        },
      },
      get: {
        tags: ['account'],
        summary: 'Get existing accounts',
        description: 'Account management',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Account',
              },
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
  },
  definitions: {
    Account: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Joao Silva',
        },
        balance: {
          type: 'integer',
          example: 1000,
        },
      },
    },
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: 'http://swagger.io',
  },
};
