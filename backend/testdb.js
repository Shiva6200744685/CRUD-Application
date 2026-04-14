require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected successfully!");
    console.log("Host:", mongoose.connection.host);
    console.log("Database:", mongoose.connection.name);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
