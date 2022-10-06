const { Router } = require("express");
const multer = require('multer');
const uploadConfig = require("../src/configs/upload");

const PlatesController = require("../src/Controllers/PlatesController");
const ensureAuthenticated = require("../src/middleware/ensureAuthenticated");
const ensureIsAdmin  = require("../src/middleware/ensureAuthenticatedAdmin");

const platesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const platesController = new PlatesController();

platesRoutes.use(ensureAuthenticated);

platesRoutes.post("/", ensureIsAdmin, upload.single("image"),platesController.create);
platesRoutes.get("/", platesController.index);
platesRoutes.get("/:id", platesController.show);
platesRoutes.delete("/:id", ensureIsAdmin, platesController.delete);
platesRoutes.put("/:id", ensureIsAdmin, upload.single("image"), platesController.update);

module.exports = platesRoutes;