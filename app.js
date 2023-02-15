const config = require("./config");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to the Unsplash API!");
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.PORT}`);
});