const express = require('express');

const routes = express.Router();
// const name = require('../controllers/');

routes.use('/contacts', require('./contacts'));

module.exports = routes;
