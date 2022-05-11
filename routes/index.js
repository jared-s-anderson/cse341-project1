const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const routes = express.Router();
// const name = require('../controllers/');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.use('/contacts', require('./contacts'));

module.exports = routes;
