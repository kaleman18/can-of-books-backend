'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

const app = express();
app.use(cors());

const Book = require('./books.js');

app.get('/books', handleGetBooks);

async function handleGetBooks( request, response ){
    let filter = { };
    const books = await Book.find(filter);
    response.status(200).json(books);
}



const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
