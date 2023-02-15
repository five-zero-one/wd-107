const express = require("express");
const { createApi } = require("unsplash-js");
const config = require("../config");

const unsplash = createApi({
    accessKey: config.unsplash.accessKey,
    secretKey: config.unsplash.secretKey,
});

const photoRouter = express.Router();

/** GET all photos */
photoRouter.get("/", async (req, res) => {
    // use axios to make a request to the API
    // const photos = await axios.get(apiUrl);
    // use unsplash-js to make a request to the API

    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;

    try {
        const api = await unsplash.photos.list({ page, perPage });
        if (api.errors) throw new Error("Server error.Please try again later.");

        const photos = api.response.results.map(({ id, urls: { raw } }) => ({
            id: id,
            url: raw,
        }));

        res.send(photos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/** GET a single photo */
photoRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const api = await unsplash.photos.get({ photoId: id });
        if (api.errors) throw new Error("Server error.Please try again later.");

        res.send(api.response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/** GET user's photos */
photoRouter.get("/user/:id", (req, res) => {
    res.send({ message: `GET photos for user ${req.params.id}` });
});

module.exports = photoRouter;