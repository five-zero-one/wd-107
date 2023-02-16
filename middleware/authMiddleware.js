const { expressjwt } = require("express-jwt");
const config = require("../config");


exports.validateToken = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
});