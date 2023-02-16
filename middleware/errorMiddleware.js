exports.tokenError = function handleJwtError(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        req.auth = null;
        res.sendStatus(401);
        return;
    } else {
        next(err);
    }
};