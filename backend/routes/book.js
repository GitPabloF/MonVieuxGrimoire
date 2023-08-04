const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const bookCtrl = require('../controllers/book');

router.post('/', auth, multer, bookCtrl.addBook);
router.get('/bestrating', bookCtrl.seeBestBooks);
router.post('/:id/rating', auth, bookCtrl.addRating);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/:id', bookCtrl.seeBook);
router.get('/', bookCtrl.seeBooks);

module.exports = router;
