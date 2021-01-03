const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

const User = require('../models/User');

const connection = new Sequelize(dbconfig);

User.init(connection);

//Relacionamento
// User.associate(connection.models);

module.exports = connection;   