const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  swaggerDefinition: {
    restapi: '3.0.0',
    info: {
      title: 'MON API DE GESTION DE RESIDENCE',
      version: '1.0.0',
      description: 'MON API DE GESTION DE RESIDENCE',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['../routes/*.js'],
}

const specs = swaggerJsdoc(options)

module.exports = (app) => {
  app.use('/residences', swaggerUi.serve, swaggerUi.setup(specs))
}