module.exports = function(sequelize, DataTypes) {
  var Level = sequelize.define("Level", {
    level_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    choices: {
      type: DataTypes.TEXT
    },
    sf_dialog: {
      type: DataTypes.TEXT
    },
    player_dialog: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  });
  return Level;
};
