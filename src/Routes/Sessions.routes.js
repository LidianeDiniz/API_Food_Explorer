const {Router}= require ("express");

const SessionsController = require("../src/Controllers/SessionsController");

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post("/", sessionsController.create);



module.exports = sessionsRoutes;