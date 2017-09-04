module.exports = function(sequelize, DataTypes) {
  var Level = sequelize.define("Level", {
    level_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  }, {
    timestamps: false
  });
  return Level;
};
