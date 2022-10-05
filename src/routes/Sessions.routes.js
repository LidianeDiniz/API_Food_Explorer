const {Router}= require ("express");

const sessionsController = require("../controllers/SessionsController");

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post("/", sessionsController.create);



module.exports = sessionsRoutes;