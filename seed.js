'use strict'

const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./books');

mongoose.connect(process.env.MONGODB_CONN);

async function seed() {
    try{
        await Book.create({
            title: "Meditation of Marcus Aurelius",
            description: "Meditations is a series of personal writings by the Roman Emperor Marcus Aurelius, offering a profound glimpse into his Stoic philosophy and reflections on life. Composed during his reign from 161 to 180 AD, the work is a collection of self-addressed notes, never intended for publication, in which Aurelius explores themes of virtue, resilience, and the impermanence of human existence. Through a blend of practical wisdom and philosophical contemplation, he grapples with the challenges of leadership, the nature of morality, and the pursuit of inner tranquility in the face of external turmoil. The meditative tone and timeless insights contained in Marcus Aurelius's Meditations continue to resonate with readers across centuries, making it a classic in the realm of philosophical literature.",
            status: "Published"
        })
        .then(()=> console.log('Saved Meditations'))
        await Book.create({
            title: "Everybody Always",
            description: "Everybody, Always reveals the transformative power of love, acceptance, and forgiveness. Written by Bob Goff, a lawyer turned humanitarian, this book shares stories of Goff's experiences learning to love everyone around him with an unwavering and radical kind of love. Filled with inspiring anecdotes and powerful lessons, Everybody, Always encourages readers to break down barriers, embrace a lifestyle of love, and make a lasting impact on the world by extending grace to all.",
            status: "Published"
        })
        .then(() => console.log('Saved Everybody Always'));
        await Book.create({
            title: "The Alchemist",
            description: "The Alchemist is a bestselling novel by Brazilian author Paulo Coelho. Originally published in Portuguese in 1988, the book follows the journey of Santiago, a shepherd boy, as he pursues his dreams and seeks to discover the treasure hidden in the Egyptian pyramids. Through a series of mystical experiences and encounters with various characters, Santiago learns profound lessons about destiny, personal legend, and the importance of listening to one's heart. The Alchemist has become a modern classic, celebrated for its inspirational storytelling and timeless wisdom.",
            status: "Published"
        })
        .then(() => console.log('Saved The Alchemist'));
    } catch (e){
        console.log(e.message)
    }
    mongoose.disconnect();
}

seed();