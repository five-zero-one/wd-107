const config = require("./config");
const express = require("express");
const photoRouter = require("./routes/photoRoutes");

const app = express();


app.use(express.json());

app.use("/api/photos", photoRouter);

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});