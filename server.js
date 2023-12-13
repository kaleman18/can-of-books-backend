'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');



const app = express();
app.use(cors());
// reads the url for objects for us to send to the server in POST
app.use( express.json() );

const Book = require('./books.js');

app.get('/books', handleGetBooks);

app.post('/books', async (request, response) => {
  try {
    let newBook = request.body;
    console.log(newBook);
    let addedBook = await Book.create(newBook);
    console.log('Added this book:',addedBook);
    response.json(addedBook);
  } catch(e) {
    console.log('POST book not working', e.message);
    response.status(405).send(e.message);
  }
});

app.delete('/books/:id', async (request, response) => {
  try{
    let id = request.params.id;
    let deletedBook = await Book.findByIdAndDelete(id);
    console.log('Deleated',deletedBook);
    response.status(204).send({});
  } catch(e){
    response.status(405).send(e.message);
  }
});

async function handleGetBooks( request, response ){
  let filter = { };
  const books = await Book.find(filter);
  response.status(200).json(books);
}



const PORT = process.env.PORT || 3000;

app.get('/test', (request, response) => {

  response.send('test request received');

});

mongoose.connect(process.env.MONGODB_URL);
app.listen(PORT, () => console.log(`listening on ${PORT}`));
