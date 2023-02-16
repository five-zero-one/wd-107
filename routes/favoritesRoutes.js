const FavoritesController = require("../controllers/favoritesController");
const AuthMiddleware = require("../middleware/authMiddleware");
const ErrorMiddleware = require("../middleware/errorMiddleware");

const photosRouter = require("express").Router();

photosRouter
    .use(AuthMiddleware.validateToken, ErrorMiddleware.tokenError)
    .post("/", FavoritesController.favoritePhoto)
    .get("/", FavoritesController.getFavoritePhotos)
    .put("/:id", FavoritesController.updateFavoritePhoto)
    .delete("/:id", FavoritesController.removeFavoritePhoto);

module.exports = photosRouter;