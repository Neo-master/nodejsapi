var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Define our modeling basing
var RecipeSchema = new Schema({
    name: {
      type: String,
      required: 'Kindly enter the name of the recipe'
    },
    author: {
      type: String,
      required: 'Kindly enter the name of the author of recipe'
    },
    description: {
      type: String,
      required: 'Kindly enter the name of the recipe'
    },
    url: {
      type: String,
      required: 'Kindly enter the url of the recipe'
    },
  Ingredients:{
      type: Array,
  },
  Method:{
      type: Array,
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);