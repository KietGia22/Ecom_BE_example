const register = require("./register");
const login = require("./login");
const { logout, logoutAll } = require("./logout");
const getUser = require("./getUser");
const updateUser = require("./updateUser");
const getUserProduct = require("./getUserProduct");

module.exports = {
  register,
  login,
  logout,
  updateUser,
  logoutAll,
  getUser,
  getUserProduct,
};
