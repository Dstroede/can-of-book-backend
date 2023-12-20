'use strict'

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const getBooks = require('./modules/getBooks');
const bookModel = require('./books');
const seed = require('./seed');
const authorize = require('./authorize')
const app = express();

app.use(cors());
app.use(express.json());
app.use(authorize);

const PORT = process.env.PORT

mongoose.connect(`mongodb+srv://drewstroede:${MONGODBPASS}@cluster0.wvycfuz.mongodb.net/?retryWrites=true&w=majority`);


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
        const userEmail = req.user.email;
        if(!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({error: 'Invalid Book ID'});
        }

        const deletedBook =await bookModel.findOneAndDelete({_id: bookId, user: userEmail });

        if (!deletedBook) {
            return res.status(404).json({ error: 'Books Not Found'});
        }

        res.json({message: 'Book Deleted Successfully' , deletedBook});
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message});
        }
    });

app.put('/books/:id', async (req, res, next) => {
    try{
        const bookId = req.params.id;
        const userEmail = req.user.email;
        if(!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({error: 'Invalid Book ID'});
        }

        const updatingBook = await bookModel.findOneAndUpdate({ _id: bookId, user: userEmail }, req.body, { new: true });

        if (!updatingBook) {
            return res.status(404).json({ error: 'Book Not Found'});
        }
    
        res.json({message: 'Book Updated Successfully' , updatingBook});
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message});
        }
    });
app.post('/books', async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        const userEmail = req.user.email;
        console.log('I am in the post route', userEmail)

        if (!title || !description || !status) {
            return res.status(400).json({ error: 'All fields are required'})
        }
        const newBook = await bookModel.create({ title, description, status, user: userEmail })
        res.status(201).json(newBook);
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Internal; Server Error', details: error.message})
    }
});

app.get('*', (req, res, next) => res.status(404).send('Resource Not Found'));

app.listen(PORT, () => console.log(`listening on ${PORT}`));