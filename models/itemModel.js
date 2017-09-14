module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },
    reputation: {
  type: DataTypes.INTEGER,
  defaultValue: 30
  },
  backpack: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
  },
  //backpack will only exist on shop object
  //plan to change
  secret: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
  }
},{
    timestamps: false
  });
 
//Associate with another table (or model)
Item.associate = (models) => {
 // We're saying that an Item should belong to a Backpack
    // An item can't be created without a Backpack due to the foreign key constraint
    Item.belongsTo(models.Backpack, {
      foreignKey: {
        allowNull: false
      }
    });
  };
   return Item;
};
