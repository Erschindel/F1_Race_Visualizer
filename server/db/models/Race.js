const db = require('../db');
const Sequelize = require('sequelize');

module.exports = db.define('race', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // In the future, might make sense to store lap data in my db to reduce dependency on remote calls
  // lapData: {
  //   type: Sequelize.TEXT,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
});
