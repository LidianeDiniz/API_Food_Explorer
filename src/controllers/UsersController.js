const { hash } = require ("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");


class UsersController {
   async create(request, response){
      const { name, email, password } = request.body;

      const checkUserExists = await knex("users").where({ email }).first();


      if (checkUserExists) {
        throw new AppError("E-mail já cadastrado, tente outro e-mail.");
      }
    
      const hashPassword = await hash(password, 8);

      await knex("users").insert({ name, email, password: hashPassword});

      return response.status(201).json();
    }
    
    
 
    
}

module.exports = UsersController;



