const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

const DRESSES = [
    { id: 1, title: 'Dress', price: 8000 }
]

app.get('/api/dresses', (req, res) => {
    res.status(200).json(DRESSES);
})

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
