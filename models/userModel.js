const { Schema, model } = require("mongoose");

const Users = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

Users.virtual("id").get(() => {
    return this._id;
});

module.exports = model("Users", Users);