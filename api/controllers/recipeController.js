var mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipe');

exports.list_all_recipes = function(req, res) {
  Recipe.find({}, function(err, recipe) {
    if (err)
      res.send(err);
    res.json(recipe);
  });
};

exports.create_a_recipe = function(req, res) {
    let ingredients;
    let method;
    ingredients=req.body.ingredients.split(","),
    method=req.body.method.split(",");

  var new_recipe = new Recipe({
    name:req.body.name || "Untitled name",
    url:req.body.url || "No url for this recipe ",
    description:req.body.description || "No description furnished",
    author:req.body.author || "No author furnished",
    Ingredients:ingredients || "No description furnished",
    Method:method || "No method furnished",

  });

  new_recipe.save(function(err, recipe) {
    if (err)
      res.send(err);
    res.json(recipe);
  });
};


exports.read_a_recipe = function(req, res) {
  Recipe.findById(req.params.recipeId).then(recipe =>{
    if(!recipe) {
        return res.status(404).send({
            message: "Recipe not found with id " + req.params.recipeId
        });            
    }
    res.send(recipe);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Recipe not found with id " + req.params.recipeId
        });                
    }
    return res.status(500).send({
        message: "Error retrieving Recipe with id " + req.params.recipeId
    });
});
};



exports.update_a_recipe = function(req, res) {
    let ingredients=req.body.ingredients.split(",");
    let method=req.body.method.split(",");
  Recipe.findByIdAndUpdate({_id: req.params.recipeId}, 
    {
        name:req.body.name || "Untitled name",
        url:req.body.url || "No url for this recipe ",
        description:req.body.description || "No description furnished",
        author:req.body.author || "No author furnished",
        Ingredients:ingredients || "No description furnished",
        Method:method || "No method furnished",
    },
     {new: true}).then(recipe => {
    if(!recipe) {
        return res.status(404).send({
            message: "recipe not found with id " + req.params.recipeId
        });
    }
    res.send(recipe);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "recipe not found with id " + req.params.recipeId
        });                
    }
    return res.status(500).send({
        message: "Error updating recipe with id " + req.params.recipeId
    });
});
};



exports.delete_a_recipe = function(req, res) {


  Recipe.findByIdAndRemove({
    _id: req.params.recipeId
  }).then(recipe => {
    if(!recipe) {
        return res.status(404).send({
            message: "recipe not found with id " + req.params.recipeId
        });
    }
    res.send({message: "recipe deleted successfully!"});
}).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
            message: "recipe not found with id " + req.params.recipeId
        });                
    }
    return res.status(500).send({
        message: "Could not delete recipe with id " + req.params.recipeId
    });
});
};


