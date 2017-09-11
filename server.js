var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var PORT = process.env.PORT || 3000;

var app = express();
var db = require("./models");
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

//TO DO FOR OUR GAME_DB:
//need to set up connection to JAWSDB in controller.js file
// var mysql = require("mysql");
//
// var connection;
//
// if(process.env.JAWSDB_URL){
//
// 	connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else{
//
// 	connection = mysql.createConnection({
// 	host: "p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
// 	user: "ehhjiswjb8549j6u",
// 	password: "qar7dbcw3gion7k7",
// 	database: "game_db"
// });
// };
//
// connection.connect();
// module.exports = connection;
