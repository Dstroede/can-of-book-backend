'use strict'

const Book = require('../books');

async function getBooks(req, res, next){
    const userEmail = req.user.email;
    console.log('Here is the user: ', userEmail)
    const books= await Book.find({user: userEmail})
    res.status(200).send(books)
    // .then(data => res.status(200).send(data))
    // .catch(e => next(e));
}
module.exports = getBooks;