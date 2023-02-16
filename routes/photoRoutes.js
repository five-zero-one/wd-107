const PhotoController = require("../controllers/photoController");

const photoRouter = require("express").Router();

photoRouter
    /** GET all photos */
    .get("/", PhotoController.getAll)
    /** GET a single photo */
    .get("/:id", PhotoController.getOne)
    /** GET user's photos */
    .get("/user/:username", PhotoController.getUserPhotos);

module.exports = photoRouter;