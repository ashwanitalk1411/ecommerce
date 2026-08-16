const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const { successResponse } = require("./utils/response");
const STATUS = require("./utils/appStatusCode");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  return successResponse(res, null, "API is running", STATUS.OK);
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;