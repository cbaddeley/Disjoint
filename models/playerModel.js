module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    player_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    }
  });
  return Player;
};
