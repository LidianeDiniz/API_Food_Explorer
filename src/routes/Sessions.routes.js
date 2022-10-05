const {Router}= require ("express");

const sessionsController = require("../Controllers/SessionsController");

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post("/", sessionsController.create);



module.exports = sessionsRoutes;