const { Router } = require("express");

const UserController = require("../Controllers/UserController");


const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.create);
 

module.exports = userRoutes;