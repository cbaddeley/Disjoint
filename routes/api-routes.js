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

  app.get("/worldMap/:playerName", function(req, res) {
    db.Player.findOne({
      where: {
        player_name: req.params.playerName
      }
    }).then(function(dbLevels) {
      var hbsObject = {
        players: dbLevels
      };
      console.log(hbsObject);
      res.render("worldMap", hbsObject);
      });
  });

  app.put("/api/levelAccess", function(req, res) {
    var playerName = req.body.player_name;
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Player.update({
      level_access: req.body.level
    }, {
      where: {
        player_name: req.body.player_name
      }
    }).then(function(dbGame) {
      res.send({redirect: '/worldMap/'});

    });
  });

  app.get("/worldMap", function(req, res) {
    db.Level.findAll({}).then(function(dbLevels) {
      var hbsObject = {
        levels: dbLevels
      };
      console.log(hbsObject);
      res.render("worldMap", hbsObject);
      });
  });

};
