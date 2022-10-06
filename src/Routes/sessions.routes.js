const {Router}= require ("express");

const SessionsController = require("../Controllers/SessionsController");

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post("/", sessionsController.create);



module.exports = sessionsRoutes;