const { Schema, model } = require("mongoose");

// {user,url,description,username}
const FavoritePhotos = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    explanation: {
        type: String,
        required: true,
    },
});

FavoritePhotos.virtual("id").get(() => {
    return this._id;
});

module.exports = model("FavoritePhotos", FavoritePhotos);