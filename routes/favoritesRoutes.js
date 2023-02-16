const express = require("express");
const { expressjwt } = require("express-jwt");
const { z, ZodError } = require("zod");
const config = require("../config");
const FavouritePhotos = require("../models/favoritePhotoModel");

const auth = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
});

function handleJwtError(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        req.auth = null;
        res.sendStatus(401);
        return;
    } else {
        next(err);
    }
};

const photosRouter = express.Router();

photosRouter.use(auth, handleJwtError);

photosRouter.post("/", async (req, res) => {
    const decoder = z.object({
        url: z.string(),
        description: z.string().min(1).max(160),
        username: z.string(),
        explanation: z.string().min(1).max(160),
    });

    try {
        const parsed = await decoder.parseAsync(req.body);

        const photo = await FavouritePhotos.create({ ...parsed, user: req.auth.sub });

        res.send(photo);
    } catch (error) {
        if (error.code === 11000) {
            console.log(error);
            res.status(400).send("Error adding photo to favorites");
            return;
        }

        if (error instanceof ZodError) {
            res.status(401).send("Error with request body");
            return;
        }

        res.status(500).send(error);
    }
});

photosRouter.get("/", async (req, res) => {
    try {
        const photos = await FavouritePhotos.find({ user: req.auth.sub });

        // TODO map from within the find function
        const mappedPhotos = photos.map((photo) => ({
            username: photo.username,
            url: photo.url,
            explanation: photo.explanation,
            description: photo.description,
            id: photo.id
        }));

        res.send(mappedPhotos);
    } catch (error) {
        if (error.code === 11000) {
            console.log(error);
            res.status(400).send("Error adding photo to favorites");
            return;
        }

        res.status(500).send(error);
    }
});

photosRouter.put("/:id", async (req, res) => {
    const { id } = req.params;

    const decoder = z.object({
        explanation: z.string().min(1).max(160),
    });

    try {
        const parsed = await decoder.parseAsync(req.body);

        const updateResult = await FavouritePhotos.updateOne({ _id: id, user: req.auth.sub }, { $set: { explanation: parsed.explanation } });
        updateResult.modifiedCount === 1 ? res.sendStatus(200) : res.sendStatus(404);
    } catch (error) {
        if (error.code === 11000) {
            console.log(error);
            res.status(400).send("Error updating favourites explanation");
            return;
        }

        if (error instanceof ZodError) {
            res.status(401).send("Error with request body");
            return;
        }

        res.status(500).send(error);
    }
});

photosRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deleteResult = await FavouritePhotos.deleteOne({ _id: id });
        // FIXME: if not count then throw error
        deleteResult.deletedCount === 1 ? res.sendStatus(200) : res.sendStatus(404);
    } catch (error) {
        if (error.code === 11000) {
            console.log(error);
            res.status(400).send("Error adding photo to favorites");
            return;
        }

        res.status(500).send(error);
    }
});

module.exports = photosRouter;