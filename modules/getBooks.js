'use strict'

const Book = require('../books');

async function getBooks(req, res, next){
    const books= await Book.find({})
    res.status(200).send(books)
    // .then(data => res.status(200).send(data))
    // .catch(e => next(e));
}
module.exports = getBooks;