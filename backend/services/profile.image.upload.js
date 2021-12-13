const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const storage = GridFsStorage.GridFsStorage({
    url: process.env.MONGO_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        const newFileName = `${Date.now()}`;
        console.log(newFileName);

        if (match.indexOf(file.mimetype) === -1) {
            const filename = newFileName;
            return filename;
        }

        if (!req.body.profilePic) req.body.profilePic = "";

        req.body.profilePic = newFileName;

        return {
            bucketName: "photos",
            filename: newFileName,
        };
    },
});

module.exports = multer({ storage });
