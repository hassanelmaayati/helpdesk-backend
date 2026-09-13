require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);





mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB :D");
});

app.listen(3001, () => {
  console.log("server is running on port 3001 ;)");
});
