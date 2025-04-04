const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger Definition
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Taskify API Documentation',
      version: '1.0.0',
      description: 'API documentation for Taskify backend (with JWT Authentication)'
    },
    servers: [
      {
        url: 'http://localhost:5050', // your local server URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [
      {
        bearerAuth: [] // 👈 Apply Bearer Auth globally to all routes
      }
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
