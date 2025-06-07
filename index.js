const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
const userRoutes = require("./routes/users");
const authencationRoutes = require("./routes/authentications");
const photoRoutes = require("./routes/photos");
const commentRoutes = require("./routes/comment");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/", userRoutes);
app.use("/admin", authencationRoutes);
app.use("/photo", photoRoutes);
app.use("/photos", express.static(path.join(__dirname, "photos")));
app.use("/comment", commentRoutes);

const port = 8081;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
