const multer = require('multer');
const storage = multer.memoryStorage();

// check that the file type is an image 
const filter = (req, file, callback) => {
    if (file.mimetype.split("/")[0] === 'image') {
        callback(null, true);
    } else {
        callback(new Error("Seules les images sont acceptées"));
    }
};

// export the image in the memory storage
module.exports = multer({
    storage,
    fileFilter: filter
}).single('image');