'use strict'

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const getBooks = require('./modules/getBooks');
const bookModel = require('./books');
const seed = require('./seed');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_CONN);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => {
    console.log('Mongoose is connected');
    
    seed();
});


app.get('/', (req, res, next) => res.status(200).send('Default Route Working'));

app.get('/books', getBooks);

app.delete('/books/:id', async (req, res, next) => {
    try{
        const bookId = req.params.id;
        console.log('Deleteing book with Id: ', bookId);
        if(!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({error: 'Invalid Book ID'});
        }

        const deletedBook =await bookModel.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ error: 'Books Not Found'});
        }

        res.json({message: 'Book Deleted Successfully' , deletedBook});
        } catch (error) {
            console.error('Error in delete route:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message});
        }
    });

app.post('/books', async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !description || !status) {
            return res.status(400).json({ error: 'All fields are required'})
        }
        const newBook = await bookModel.create({ title, description, status })
        res.status(201).json(newBook);
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Internal; Server Error'})
    }
});

app.get('*', (req, res, next) => res.status(404).send('Resource Not Found'));

app.listen(PORT, () => console.log(`listening on ${PORT}`));