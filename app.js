const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
app.use(express.json({ extended: true }));
app.use("/api/todos", require("./routes/Route.js"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "front", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front", "build", "index.html"));
  });
}

const PORT = config.get("PORT") || 5000;
const URI = config.get("uri");

async function startApp() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Server error, try again" + error);
    process.exit(1);
  }
}

app.listen(PORT, () => {
  console.log(`App has been started on port ${PORT}`);
});

startApp();
