const {USER,PASSWORD,HOST} = require("../config/secret.config.js");

module.exports = {
  HOST: HOST,
  USER:  USER,
  PASSWORD:  PASSWORD,
  DB: "antar_crm",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
