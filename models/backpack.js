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
Backpack.associate = function(models) {
// Associating Backpack with Items
// When a Backpack is deleted, also delete any associated Items
    Backpack.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };
  return Backpack;

};
