const db = require('../db');
const Sequelize = require('sequelize');

const Track = db.define('track', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  shape: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Track.beforeValidate((track) => {
  if (!track.slug) {
    track.slug = track.name.replace(/\s/g, '_');
  }
});

module.exports = Track;
