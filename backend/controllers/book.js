const bookModel = require('../models/book');

exports.addBook = (req, res, next) => {
    const book = new bookModel({
        ...req.body
    })
    .then(() => res.status(201).json({ message:'Livre ajouté avec succès !'}))
    .catch((error) => res.status(400).json({ error}));
}