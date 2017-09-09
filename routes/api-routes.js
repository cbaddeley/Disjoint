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

  app.get("/api/playerLevel/:player", function(req, res) {
    db.Player.findAll({
      where: {
        player_name: req.params.player
      }
    }).then(function(data) {
      res.json(data);
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

  //app.get("/level3", function(req, res) {
    //db.Item.findAll({}).then(function(dbItems) {
      //var hbsObject = {
      //  items: dbItems
      //};
     // console.log(hbsObject);
      //res.render("level3", hbsObject);
      //});
  //});
  //check json
  app.get("/api/level3", function(req, res){
    db.Shop.findAll({}).then(function(dbShop){
      res.json(dbShop);
    });
  });
//adding shop values
app.get("/level3", function(req, res){db.Shop.findAll({}).then(function(dbShop){var hbsObject = {shop: dbShop};
console.log(hbsObject);//doesn't show in console
res.render("level3", hbsObject);
});
});
//route for creating shop stuff
app.post("/api/level3", function(req, res){db.Shop.create({item_name: req.body.item_name//, reputation: req.body.reputation, backpack: req.body.backpack, secret: req.body.secret
}).then(function(dbShop) {
  res.redirect("level3", res.json(dbShop));//maybe takeout hbsObject
});
});
//PUT route for 'buying' items from shop
app.put("/:id", function(req, res) {
  db.Shop.update({
    backpack: true
  }, {
    where: {
      id: req.params.id
    }
  
  }).then(function(dbShop) {
    res.redirect("/level3");
  });
});

// //PUT route for 'buying' items from shop
// app.put("/:id", function(req, res) {
//   db.Shop.update({
//     backpack: false
//   }, {
//     where: {
//       id: req.params.id
//     }
  
//   }).then(function(dbShop) {
//     res.redirect("/level3");
//   });
// });
//DELETE by something other than id?Maybe shop item#?
app.delete("/api/level3/:id", function(req, res) {
  db.Shop.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbShop) {
    res.redirect("/level3");
  });
});


};
