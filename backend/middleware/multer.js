const multer = require('multer');
const storage = multer.memoryStorage();

const filter = (req, file, callback) => {
    if (file.mimetype.split("/")[0] === 'image') {
        callback(null, true);
    } else {
        callback(new Error("Seules les images sont acceptées"));
    }
};

module.exports = multer({
    storage,
    fileFilter: filter
}).single('image');