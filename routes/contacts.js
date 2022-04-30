const express = require('express');
const routes = express.Router();

const controllerContacts = require('../controllers/contacts');
routes.get('/', controllerContacts.retrieveAll);
routes.get('/:id', controllerContacts.retrieveSingle);

module.exports = routes;