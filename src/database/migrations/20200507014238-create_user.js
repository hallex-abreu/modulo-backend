'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ativo : {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      perfil : {
        type: Sequelize.STRING,
        defaultValue: 'usuario',
        allowNull: false,
      },
      nome : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email : {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      telefone : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha_Resete_Token : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      senha_Resete_Expires : {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      } 
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
