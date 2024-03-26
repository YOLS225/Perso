const express = require("express");
// const swaggerJsdoc = require('swagger-jsdoc')
// const swaggerUi = require('swagger-ui-express')
const router = express.Router();
const routes=require('./routes/routes')
// Charge le module HTTP
const http = require("http");
var bodyParser = require('body-parser');






const hostname = "localhost";
const port = 4000;

const app = express();
app.use(bodyParser.json())
app.use(router);
app.use(routes);
// swagger(app) ;
// Crée un serveur HTTP
const server = http.createServer(app);

// const options = {
//   swaggerDefinition: {
//     restapi: '3.0.0',
//     info: {
//       title: 'MON API DE GESTION DE RESIDENCE',
//       version: '1.0.0',
//       description: 'MON API DE GESTION DE RESIDENCE',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//       },
//     ],
//   },
//   apis: ['./routes/*.js'],
// }

// const specs = swaggerJsdoc(options)
// app.use('/residences', swaggerUi.serve, swaggerUi.setup(specs))

// Démarre le serveur à l'adresse 127.0.0.1 sur le port 3000
// Affiche un message dès que le serveur commence à écouter les requêtes
server.listen(port, hostname, () => {
  console.log(`Le serveur tourne à l'adresse https://${hostname}:${port}/`);
});
