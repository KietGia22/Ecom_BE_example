const express = require("express");
const usersRouter = express.Router();
const {
  register,
  login,
  getUser,
  logout,
  logoutAll,
  updateUser,
  getUserProduct,
} = require("../controller/users");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  addProductSize,
  updateProductSize,
  deleteProductSize,
} = require("../controller/products");
const { userAuth, adminAuth } = require("../middleware");
const { getOrders } = require("../controller/orders");

usersRouter.get("/current", userAuth, getUser);
usersRouter.post("/current", register);
usersRouter.post("/current/login", login);
usersRouter.put("/current", userAuth, updateUser);
usersRouter.delete("/current/logout", userAuth, logout);
usersRouter.delete("/current/logoutAll", userAuth, logoutAll);

usersRouter.get("/current/product", userAuth, adminAuth, getUserProduct);
usersRouter.post("/current/product", userAuth, adminAuth, addProduct);
usersRouter.put("/current/product/:id", userAuth, adminAuth, updateProduct);
usersRouter.delete("/current/product/:id", userAuth, adminAuth, deleteProduct);
usersRouter.post("/current/product/size", userAuth, adminAuth, addProductSize);
usersRouter.put(
  "/current/product/size/:sizeId",
  userAuth,
  adminAuth,
  updateProductSize
);
usersRouter.delete(
  "/current/product/size/:sizeId",
  userAuth,
  adminAuth,
  deleteProductSize
);

usersRouter.get("/current/orders", userAuth, getOrders);

module.exports = usersRouter;
