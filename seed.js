const mongoose = require('mongoose');
require('dotenv').config();

const Book = require('./books.js');

mongoose.connect(process.env.MONGODB_URL);


async function seed() {

    try {
        await Book.create({
            title: "Learning to Code",
            description: "Devouring this book",
            status: "Memorizing"
        });
    } catch (e) {
        console.error(e.message);
    }

    mongoose.disconnect();
}

seed();
