const sequelize = require("../database/connection.js"),
{DataTypes} = require("sequelize"),
users = sequelize.define("user", {
id: {
    type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4
}
})