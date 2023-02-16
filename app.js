const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app
    .use(express.json())
    .use("/api/users", require("./routes/userRoutes"))
    .use("/api/photos/favorites", require("./routes/favoritesRoutes"))
    .use("/api/photos", require("./routes/photoRoutes"))
    .listen(config.port, main);

async function main() {
    console.log(`Listening on port ${config.port}`);
    try {
        await mongoose.connect(config.mongo);
        console.log("Connected to MongoDB");
    } catch (error) {
        // close the server
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
}