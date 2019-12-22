const Express = require("express");
const BodyParser = require("body-parser");
mongoose = require('mongoose'),
Recipe = require('./api/models/recipeModel');

// Mongodb url
const CONNECTION_URL  = "mongodb+srv://roydevman:R%40my2019%21@roycluster-cnevb.mongodb.net/test?retryWrites=true&w=majority";


var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
}); 

require('./api/routes/recipeRoutes') (app); //importing route


//Binding ports
app.listen(3000);

//handling bad urls
 app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});