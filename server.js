require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentRouter = require("./routes/commentRouter");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: isProduction ? true : "http://localhost:5173",
  })
);

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/tickets", ticketRoutes);
app.use("/", commentRouter);

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});


app.listen(port, "0.0.0.0", () => {
  console.log(`The express app is ready on port ${port}!`);
});

