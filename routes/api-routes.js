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
      res.send({redirect: '/level1'});
    });
  });

//This route will be used on the worldMap and is used in worldMap.js file. It sends what levels the player has access to.
  app.get("/api/playerLevel/:player", function(req, res) {
    db.Player.findAll({
      where: {
        player_name: req.params.player
      }
    }).then(function(data) {
      res.json(data);
      });
  });

//This is the PUT request to update the levels the player has access to
  app.put("/api/levelAccess", function(req, res) {
    var playerName = req.body.player_name;

    db.Player.update({
      level_access: req.body.level
    }, {
      where: {
        player_name: req.body.player_name
      }
    }).then(function(dbGame) {
      //It brings them to the worldMap. Well the js file on the client side does but this sends the redirect. This function would ideally be used with the next level button.
      res.send({redirect: '/worldMap/'});

    });
  });
//This gets all the levels from the levels database and uses handlebars to render them on the page.
  app.get("/worldMap", function(req, res) {
    db.Level.findAll({}).then(function(dbLevels) {
      var hbsObject = {
        levels: dbLevels
      };
      console.log(hbsObject);
      res.render("worldMap", hbsObject);
      });
  });
//This is the market page.
  app.get("/level3", function(req, res) {
    db.Item.findAll({}).then(function(dbItems) {
      var hbsObject = {
        items: dbItems
      };
      console.log(hbsObject);
      res.render("level3", hbsObject);
      });
  });

  app.get("/api/levelInfo/:level", function(req, res) {
    db.Level.findAll({where: {
      id: parseInt(req.params.level)
    }
  }).then(function(dbLevelData) {
    res.json(dbLevelData);
  });
});

};
