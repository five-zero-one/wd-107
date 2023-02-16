module.exports = {
    port: process.env.PORT || 3000,
    unsplash: {
        accessKey: process.env.UNSPLASH_ACCESS_KEY,
        secretKey: process.env.UNSPLASH_SECRET_KEY
    },
    mongo: process.env.MONGO_URI || "",
    jwtSecret: process.env.JWT_SECRET || "secret"
};