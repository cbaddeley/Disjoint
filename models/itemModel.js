module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    }
  });
  return Item;
};
