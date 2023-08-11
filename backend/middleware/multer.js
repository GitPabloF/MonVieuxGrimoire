const multer = require('multer');
const sharp = require('sharp');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'images');
//     },
//     filename: (req, file, callback) => {
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         callback(null, name + Date.now() + '.' + extension);
//     }
// });

// v2

const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        console.log('1' + file);
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        console.log('req.file.originalname : ' + file.originalname);
        const fileName = name + Date.now() + '.webp';
        console.log('2' + fileName);
        sharp(file.buffer)
            .webp({ quality: 20 })
            .toFile('../images/' + fileName)
            .then(() => {
                console.log('image ajoutée');
            })
            .catch((error) => console.log(error));
    }
});

module.exports = multer({ storage: storage }).single('image');
