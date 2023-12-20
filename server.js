'use strict'

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const getBooks = require('./modules/getBooks');

const app = express();

app.use(cors());

const PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_CONN);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => console.log('Mongoose is connected'));

app.get('/', (req, res, next) => res.status(200).send('Default Route Working'));

app.get('/books', getBooks);

app.get('*', (req, res, next) => res.status(404).send('Resource Not Found'));

app.listen(PORT, () => console.log(`listening on ${PORT}`));