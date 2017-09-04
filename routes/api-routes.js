// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================

module.exports = function(app) {
//This renders the first screen when the player visits the site
  app.get("/", function(req, res) {

      res.render("index");

  });
//Here is when the player first puts in their name. It stores the value in the database and then renders the first level
  app.post("/api/playerName", function(req, res) {
    db.Player.create({
      player_name: req.body.player_name
    }).then(function(dbTodo) {
      //I'm sending a redirect to the client but they have to use it on their side as well
      res.send({redirect: '/firstLevel'});
    });
  });
// Don't worry about this function I'm still figuring stuff out
  // app.get("/start", function(req, res) {
  //   console.log("asdf");
  //   db.Player.findOne({
  //     where: {
  //       player_name: id
  //     }
  //   }).then(function(dbAuthor) {
  //     res.json(dbAuthor);
  //   });
  // });

};
