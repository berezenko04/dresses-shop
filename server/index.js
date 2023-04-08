import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'

//routes
import AuthRoutes from './routes/auth.js'
import APIProductsRoutes from './routes/product.js'


const PORT = process.env.PORT || 3001;
const db = 'mongodb+srv://luxurypluxury:28082004r@wedding.fwhc0ye.mongodb.net/wedding?retryWrites=true&w=majority';

mongoose.connect(db)
    .then(() => console.log('DB is started!'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRoutes);
app.use('/api', APIProductsRoutes);


app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on port localhost:${PORT}...`);
});