module.exports = function(sequelize, DataTypes) {
  var Backpack = sequelize.define("Backpack", {

  });

  // Player.belongsToMany(shopModel, {through: 'Backpack'});

  return Backpack;
};
