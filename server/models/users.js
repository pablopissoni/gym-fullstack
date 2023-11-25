const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "users", {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    identification_card: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    health_details: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    validity: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
}