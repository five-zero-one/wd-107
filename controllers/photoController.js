const { createApi } = require("unsplash-js");
const config = require("../config");

const unsplash = createApi({
    accessKey: config.unsplash.accessKey,
    secretKey: config.unsplash.secretKey,
});

exports.getAll = async (req, res) => {
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
};

exports.getOne = async (req, res) => {
    const { id } = req.params;

    try {
        const api = await unsplash.photos.get({ photoId: id });
        if (api.errors) throw new Error("Server error.Please try again later.");

        res.send(api.response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getUserPhotos = async (req, res) => {
    const { username } = req.params;

    try {
        const api = await unsplash.users.getPhotos({ username });
        if (api.errors) throw new Error("Server error.Please try again later.");

        const photos = api.response.results.map(({ id, urls: { raw }, user: { username }, description }) => ({
            id,
            username,
            url: raw,
            description: description || "No description provided.",
        }));

        res.send(photos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};