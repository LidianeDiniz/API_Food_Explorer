const {Router}= require ("express");

const UsersController= require ("../Controllers/UsersController");


const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create );
 

module.exports = usersRoutes;