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

  app.put("/api/goldRep", function(req,res) {

    db.Player.update({
      gold: req.body.gold,
      reputation: req.body.reputation
    }, {
      where: {
        player_name: req.body.player_name
      }
    }).then(function(updatedPlayer) {
      res.end();
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
//This is the market page.
  // app.get("/level3", function(req, res) {
  //   db.Item.findAll({}).then(function(dbItems) {
  //      var hbsObject = {
  //       items: dbItems
  //     };
  //     console.log(hbsObject);
  //     res.render("level3", hbsObject);
  //     });
  // });

//adding shop values
  app.get("/level3", function(req, res) {
    db.Shop.findAll({}).then(function(dbShop) {
      var hbsObject = {shop: dbShop};
    console.log(hbsObject);//doesn't show in console
    res.render("level3", hbsObject);
    });
  });
//route for creating shop stuff
  app.post("/level3", function(req, res) {
    db.Shop.create({item_name: req.body.item_name//, reputation: req.body.reputation, backpack: req.body.backpack, secret: req.body.secret
    }).then(function(dbShop) {
      res.redirect("/level3");//maybe takeout hbsObject
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

//PUT route for 'buying' items from shop
app.put("/item/:id", function(req, res) {
  db.Shop.update({
    backpack: false
  }, {
    where: {
      id: req.params.id
    }

  }).then(function(dbShop) {
    res.redirect("/level3");
  });
});
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


  app.get("/api/levelInfo/:level", function(req, res) {
    console.log("the level is:" + req.params.level);
    db.Level.findAll({where: {
      id: parseInt(req.params.level)
    }
  }).then(function(dbLevelData) {
    res.json(dbLevelData);
    console.log("This is gathering all level data"+ dbLevelData);
  });
});

};
