const db = require('../db');
const Sequelize = require('sequelize');

module.exports = db.define('driver', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  team: {
    type: Sequelize.STRING,
    defaultValue: 'Williams',
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://echamicrobiology.com/app/uploads/2016/05/question-mark-character.jpg',
  },
});
