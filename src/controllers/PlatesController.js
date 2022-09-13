const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class PlatesController {
  async create(request, response) {
    const { title, description, ingredients, price } = request.body;

    const { filename: imageFilename } = request.file;

    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(imageFilename);

    const plates_id = await knex("plates").insert({
      image: filename,
      title,
      description,
      price
    });
    
    const ingredientsInsert = ingredients.map((name) => ({
      name,
      plates_id,
    }));

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
  }


  async update(request, response) {
    const { title, description, ingredients, price} = request.body;
    const { id } = request.params;
    const { filename: imageFilename } = request.file;

    const diskStorage = new DiskStorage();

    const plate = await knex("plates").where({ id }).first();

    if(plate.image) {

    await diskStorage.deleteFile(plate.image);
    }

    const filename = await diskStorage.saveFile(imageFilename);

    plate.image = filename;
    plate.title = title ?? plate.title;
    plate.description = description ?? plate.description;
    plate.price = price ?? plate.price;

    const ingredientsInsert = ingredients.map(name => ({
        name,
        plates_id: plate.id
    }));

    await knex ("plates").where({ id }).update(plate);
    await knex("ingredients").where({plates_id: id}).delete();
    await knex("ingredients").insert(ingredientsInsert);

    return response.staus(200).json();
    
  }

  async index(request, response) {
    const { title, ingredients } = request.query;

  let plates
   
    if (ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());


      plates = await knex("ingredients")
        .select([
          "plates.id",
          "plates.title",
          "plates.description",
          "plates.price",
          "plates.image"
        ])
        .whereLike("plates.title", `%${title}%`).whereIn("name", filterIngredients)
        .innerJoin("plates", "plates.id", "ingredients.plates_id")
        .groupBy("plates.id")
        .orderBy("plates.title");
    } else {
      plates = await knex("plates").whereLike("title", `%${title}%`).orderBy("title");
    }

    const platesIngredients = await knex("ingredients");

    const platesWithIngredients = plates.map(plate => {
      const plateIngredients = platesIngredients.filter(
        ingredient => ingredient.plates_id === plate.id
      );

      return {
        ...plate,
        ingredients: plateIngredients,
      };
    });

    return response.status(200).json(platesWithIngredients);
  }

  async show(request, response) {
    const { id } = request.params;

    const plate = await knex("plates").where({ id }).first();
    const ingredients = await knex("ingredients")
        .where({ plates_id: id})
        .orderBy("name");

    return response.json({
        ...plate,
        ingredients
    });
  }

  async delete(request, response){
    const { id } = request.params;

    await knex("plates").where({ id }).delete();

    return response.json();
  };

 
}

module.exports = PlatesController;
