const express = require('express');
const routes = express.Router();

const controllerContacts = require('../controllers/contacts');

// This get request retrieves all of the contacts.
routes.get('/', controllerContacts.retrieveAll);

// This get request retrieves one of the contacts.
routes.get('/:id', controllerContacts.retrieveSingle);

// This post request creates a new contact.
routes.post('/', controllerContacts.createContact);

// This put request updates an exisiting contact.
routes.put('/:id', controllerContacts.updateContact);

// This put request deletes an existing contact.
routes.delete('/:id', controllerContacts.deleteContact);

// This delete request deletes all of the contacts.
routes.delete('/', controllerContacts.deleteAll);

module.exports = routes;
