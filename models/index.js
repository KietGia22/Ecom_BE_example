const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user.model");
db.order = require("./order.model");
db.product = require("./product.model");

module.exports = db;
