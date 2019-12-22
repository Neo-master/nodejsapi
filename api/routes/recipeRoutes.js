
module.exports = (app)=> {
  var recipes = require('../controllers/recipeController');//binding the controller

  // MyRecipes Routes
  app.route('/recipes')
    .get(recipes.list_all_recipes) // get all recipes
    .post(recipes.create_a_recipe);//create a recipe


  app.route('/recipes/:recipeId')
    .get(recipes.read_a_recipe)//get a recipe 
    .put(recipes.update_a_recipe) //update a recipe
    .delete(recipes.delete_a_recipe);// delete a recipe
};