const bookModel = require('../models/book');

exports.addBook = (req, res, next) => {
    console.log('étape 1');
    const bookObjet = JSON.parse(req.body.book);
    delete bookObjet._id;
    delete bookObjet._userId;
    const book = new bookModel({
        ...bookObjet,
        _userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
        }`,
        averageRating: 0
    });
    console.log(book);
    book.save()
        .then(() =>
            res.status(201).json({ message: 'Livre ajouté avec succès !' })
        )
        .catch((error) => res.status(400).json({ error }));
};

exports.seeBook = (req, res, next) => {
    bookModel
        .findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(404).json({ error }));
};

exports.seeBestBooks = (req, res, next) => {
    console.log('test1');
    bookModel
        .find()
        .then((books) => {
            console.log(books);
            res.status(200).json(books)
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.seeBooks = (req, res, next) => {
    bookModel
        .find()
        .then((books) => {
            console.log(books);
            console.log(books[0].ratings);
            res.status(200).json(books)
        })
        .catch((error) => res.status(400).json({ error }));
};
