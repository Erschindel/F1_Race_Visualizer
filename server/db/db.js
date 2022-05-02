const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE || "postgres://localhost:5432/F1",
  {
    logging: false,
  }
);

module.exports = db;
