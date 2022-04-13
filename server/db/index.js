const db = require('./db');
const Driver = require('./models/Driver');
const Race = require('./models/Race');
const Track = require('./models/Track');

Race.belongsTo(Track);
Track.hasMany(Race);

Race.belongsToMany(Driver, { through: 'Race_Drivers' });
Driver.belongsToMany(Race, { through: 'Race_Drivers' });

module.exports = {
  db,
  Track,
  Race,
  Driver,
};
