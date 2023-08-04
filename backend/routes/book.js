const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const bookCtrl = require('../controllers/book');

router.post('/', auth, multer, bookCtrl.addBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/:id', bookCtrl.seeBook);
router.get('/bestrating', bookCtrl.seeBestBooks);
router.get('/', bookCtrl.seeBooks);

module.exports = router;
