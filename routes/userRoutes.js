const UsersController = require("../controllers/userController");
const AuthMiddleware = require("../middleware/authMiddleware");
const ErrorMiddleware = require("../middleware/errorMiddleware");

const usersRouter = require("express").Router();

usersRouter
    /** GET user info */
    .get("/me", AuthMiddleware.validateToken, ErrorMiddleware.tokenError, UsersController.me)
    /** REGISTER new user */
    .post("/register", UsersController.register)
    /** LOGIN user with new token */
    .post("/login", UsersController.login)
    /** LOGOUT user from current session */
    .delete("/login", UsersController.logout);

module.exports = usersRouter;