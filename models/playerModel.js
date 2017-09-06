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
        defaultValue: "1",
    }
  });

  Player.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Player.hasOne(models.Backpack, {
      onDelete: "cascade"
    });
  };

  return Player;
};
