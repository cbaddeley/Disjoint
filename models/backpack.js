module.exports = function(sequelize, DataTypes) {
  var Backpack = sequelize.define("Backpack", {
    gold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    items: {
        type: DataTypes.STRING
    }
  });

  Backpack.associate = function(models) {

    Backpack.belongsTo(models.Player, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Backpack;
};
