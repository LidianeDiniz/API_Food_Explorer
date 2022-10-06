const { Router } = require ("express");

const userRoutes = require("./user.routes")
const platesRoutes = require("./plates.routes")
const sessionsRoutes = require("./sessions.routes");



const routes = Router();

routes.use("/users", userRoutes);
routes.use("/plates", platesRoutes);
routes.use("/sessions", sessionsRoutes);


module.exports = routes;