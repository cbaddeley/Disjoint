var path = require("path");

module.exports = function(app) {

  app.get("/level1", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/level1.html"));
  });
  app.get("/level2", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/level2.html"));
  });
  app.get("/level4", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/level4.html"));
  });
  app.get("/level5", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/level5.html"));
  });
  app.get("/level6", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/level6.html"));
  });
  app.get("/level7", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/level7.html"));
  });
  app.get("/level8", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/level8.html"));
  });
  app.get("/level9", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/level9.html"));
  });
  app.get("/level10", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/level10.html"));
  });
};
