const db = require('./db/db.js');
const app = require('./app');
const port = process.env.PORT || 3000;

db.sync() // sync our database
  .then(function () {
    app.listen(port, () => console.log(`running on port ${port}`));
  });
