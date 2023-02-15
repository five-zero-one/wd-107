const config = require("./config");
const express = require("express");

const app = express();


app.use(express.json());

app.get("/", (req, res) => {
    res.send({ message: "Welcome to the Unsplash API!" });
});

app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});