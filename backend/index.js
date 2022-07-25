require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()

const videoRoutes = require("./routes/videos.routes")
app.use(express.json())
app.use("/v1",videoRoutes)
app.listen(process.env.PORT, () => {
    console.log("connected to port", process.env.PORT)
    mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to DB at",process.env.DB_URI))
  .catch((e) => console.log("Failed to connect to DB", e));
})

// npm install cypress@9.2.0
