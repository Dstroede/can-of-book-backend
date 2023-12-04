'use strict'

const mongoose = require('mongoose');

const {Schema} = mongoose;

const bookSchema = new Schema({
    name: String,
    author: String,

})