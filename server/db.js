const { Sequelize } = require("sequelize")
require('dotenv').config();
const fs = require('fs'); //? busca todos los modelos con extension .js
const path = require('path')
// const UserModel = require('./models/users.js');
// const PartnerModel = require('./models/partners.js');


//--- Variables .env
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
//--- Variables .env

const sequelize = new Sequelize(dbName, dbUser, dbPassword,{
    host: dbHost,
    dialect: 'postgres',
});

// Definición de los modelos
// const User = UserModel(sequelize);
// const Partner = PartnerModel(sequelize);

// Configuración de las asociaciones
// const {users, partners } = sequelize.models;

// users.hasOne(Partner, { foreignKey: 'user_id' }); // Un usuario tiene un socio
// partners.belongsTo(User, { foreignKey: 'user_id' }); // Un socio pertenece a un usuario

//? Carga de todos los modelos ------------------------------
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
.forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
});

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
// -----------------------------

const { Users } = sequelize.models

//? Test de coneccion a la base de datos ------------------------------
const conection = async () => {
    try {
        await sequelize.authenticate();
        console.log('*** >>> La conexión a la base de datos se ha realizado correctamente. <<< ***');
  } catch (error) {
      console.error('*** No se pudo conectar a la base de datos: ', error);
    }
}
conection()
//? Test de coneccion a la base de datos ------------------------------



module.exports = {
    ...sequelize.models,
    postgres: sequelize
};
// const { users, partners } = sequelize.models