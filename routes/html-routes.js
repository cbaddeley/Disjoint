var path = require("path");

module.exports = function(app) {

  app.get("/firstLevel", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/firstLevel.html"));
  });

};
