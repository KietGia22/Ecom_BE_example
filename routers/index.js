
const express = require("express");
const usersRouter = require("./users");
const productsRouter = require("./products");
const cartRouter = require("./cart");
const router = express.Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/cart", cartRouter);
module.exports = router;
