const express = require("express");
const productsRouter = express.Router();
const { getProductById, getProducts } = require("../controller/products");

productsRouter.get("/:id", getProductById);
productsRouter.get("/", getProducts);

module.exports = productsRouter;
