// const path = require('path');

// const app = express();

// const PORT = process.env.PORT || 3001;

// const DRESSES = [
//     { id: 1, title: 'Dress', price: 8000 }
// ];

// app.use(express.json());

// app.use(express.static(path.resolve(__dirname, '..', 'client'), {
//     setHeaders: (res, path, stat) => {
//         if (path.endsWith('.js')) {
//             res.set('Content-Type', 'application/javascript');
//         }
//     },
// }));

// app.get('/api/dresses', (req, res) => {
//     res.status(200).json(DRESSES);
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
// });

// app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}...`));

import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://luxurypluxury:28082004r@wedding.fwhc0ye.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB is started!'))
    .catch((err) => console.log('DB error', err));

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/auth/register', (req, res) => {

})

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on port localhost:${PORT}...`);
});