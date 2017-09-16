// var Sequelize = require("sequelize");
// var sequelize = new Sequelize();
// var shopModel = require("./shopModel.js");
module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    player_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },
    level_access: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "1"
    },
    reputation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    gold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  Player.associate = function(models) {
    Player.hasMany(models.Backpack);
  };

  return Player;
};
