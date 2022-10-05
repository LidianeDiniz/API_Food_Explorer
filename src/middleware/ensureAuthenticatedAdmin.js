const knex = require('../database/knex');
const AppError = require('../utils/AppError');

async function ensureAuthenticatedAdmin(request, response, next) {
  const user_id = request.user.id;

  const user = await knex("users").where({id: user_id}).first();

  if (!user.is_admin) {
    throw new AppError("user unauthorized", 401)
  }

  next();
}

module.exports = ensureAuthenticatedAdmin;