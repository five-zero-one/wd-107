const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const { z, ZodError } = require("zod");
const config = require("../config");
const Users = require("../models/userModel");

const usersRouter = express.Router();

const auth = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
});

function handleJwtError(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        req.auth = null;
        next();
    } else {
        next(err);
    }
};

usersRouter.get("/me", auth, handleJwtError, (req, res) => {
    if (!req.auth) return res.sendStatus(401);
    res.send(req.auth);
});

/** register new user */
usersRouter.post("/register", async (req, res) => {
    // decoder to parse the request body
    const decoder = z.object({
        username: z.string().min(3).max(20),
        password: z.string().min(8).max(20),
        email: z.string().email(),
    });

    try {
        const { email, username, ...body } = await decoder.parseAsync(req.body);

        const password = await bcrypt.hash(body.password, 10);

        const user = await Users.create({ email, username, password: password });

        res.send({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send("User already exists");
            return;
        }

        if (error instanceof ZodError) {
            res.status(401).send("Error with request body");
            return;
        }

        res.status(500).send(error);
    }
});

const SECRET = "secret";

/** login user */
usersRouter.post("/login", async (req, res) => {
    const decoder = z.object({
        email: z.string().email(),
        password: z.string().max(20).optional(),
    });

    try {
        const { email, password } = await decoder.parseAsync(req.body);

        const user = await Users.findOne({ email: email }).select('+password');
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Password is incorrect");

        // create a token and return that to the user
        const token = jwt.sign({ email: user.email }, config.jwtSecret, {
            expiresIn: "1h",
            // algorithm: "HS256",
            subject: user.id,
        });

        res.send({ token });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send("User not found");
            return;
        }

        res.status(401).send("Email or password is incorrect");
    }

});

/** logout user */
usersRouter.delete("/login", (req, res) => {
    res.send("logout user");
});

module.exports = usersRouter;