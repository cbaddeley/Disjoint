module.exports = function(sequelize, DataTypes) {var Shop = sequelize.define("Shop", {
	item_name: {
	type: DataTypes.STRING,
	allowNull: false,
	validate: {len: [1, 15]}
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
return Shop;
};