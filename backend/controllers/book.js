const bookModel = require('../models/book');
const fs = require('fs');

exports.seeBestBooks = (req, res, next) => {
    bookModel
        .find()
        .then((books) => {
            const bestBooks = books
                .sort((a, b) => b.averageRating - a.averageRating)
                .slice(0, 3);
            res.status(200).json(bestBooks);
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.addBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new bookModel({
        ...bookObject,
        _userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
        }`,
        averageRating: 0
    });
    book.save()
        .then(() =>
            res.status(201).json({ message: 'Livre ajouté avec succès !' })
        )
        .catch((error) => res.status(400).json({ error }));
};
exports.addRating = (req, res, next) => {
    console.log(JSON.stringify(req.body));
    bookModel.findOne({ _id: req.params.id }).then((book) => {
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        } else {
            delete req.body._id;
            const newRating = {
                userId: req.body.userId,
                grade: req.body.rating
            };
            const newRatings = [...book.ratings, newRating];
            const newAverageRating =
                (book.averageRating + req.body.rating) / book.ratings.length;
            bookModel
                .updateOne(
                    { _id: req.params.id },
                    {
                        $set: {
                            ratings: newRatings,
                            averageRating: newAverageRating
                        }
                    }
                )
                .then(() => res.status(200).json({ message: 'note ajoutée' }))
                .catch((error) => console.log(error));
        }
        console.log('book :' + book);
    });
};

exports.seeBook = (req, res, next) => {
    bookModel
        .findOne({ _id: req.params.id })
        .then((book) => {
            console.log(book);
            res.status(200).json(book);
        })
        .catch((error) => res.status(404).json({ error }));
};

exports.deleteBook = (req, res, next) => {
    bookModel
        .findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    bookModel
                        .deleteOne({ _id: req.params.id })
                        .then(() => {
                            res.status(200).json({
                                message: 'Objet supprimé !'
                            });
                        })
                        .catch((error) => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file
        ? {
              ...JSON.parse(req.body.book),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${
                  req.file.filename
              }`
          }
        : { ...req.body };
    delete bookObject.userId;
    bookModel
        .findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                bookModel
                    .updateOne(
                        { _id: req.params.id },
                        { ...bookObject, _id: req.params.id }
                    )
                    .then(() =>
                        res.status(200).json({ message: 'Objet modifié!' })
                    )
                    .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.seeBooks = (req, res, next) => {
    bookModel
        .find()
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }));
};
