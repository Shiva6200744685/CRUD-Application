require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/items", require("./routes/items"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const { host, name } = mongoose.connection;
    console.log("✅ MongoDB Atlas connected successfully!");
    console.log(`   Host     : ${host}`);
    console.log(`   Database : ${name}`);
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
