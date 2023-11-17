const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "partners", {
        partner_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        trainer:{
            type: DataTypes.STRING,
        },
        date_end:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        state: {
            type: DataTypes.ENUM("active", "inactive", "refused"),
        }
    });

  // Defino la relación uno a uno con la tabla Users
  Partners.hasOne(sequelize.models.Users, { foreignKey: 'user_id' });
  sequelize.models.Users.belongsTo(Partners, { foreignKey: 'user_id' });

  return Partners;
};
