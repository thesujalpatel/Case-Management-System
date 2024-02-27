const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/', services.homeRoutes);
route.get('/appointments', services.appointments);
route.get('/cases', services.cases);
route.get('/attorney', services.attorney);
route.get('/features', services.features);
route.get('/ftc', services.ftc);
route.get('/aw', services.aw);
route.get('/authentication', services.authentication);
route.get('/miscellaneous', services.miscellaneous);

route.get('/admin', services.admin);
route.get('/admin/createcase', services.createcase);
route.get('/admin/updatecase', services.updatecase);


// API
route.post('/api/cases', controller.createcase);
route.get('/api/cases', controller.findcase);
route.put('/api/cases/:id', controller.updatecase);
route.delete('/api/cases/:id', controller.deletecase);

module.exports = route;