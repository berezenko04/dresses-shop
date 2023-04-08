import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

//validation
import { loginValidation, registerValidation } from './validations/auth.js'

//utils
import { checkAuth, validationErrors } from './utils/index.js';

//controllers
import * as UserController from './controllers/UserController.js';

const PORT = process.env.PORT || 3001;
const db = 'mongodb+srv://luxurypluxury:28082004r@wedding.fwhc0ye.mongodb.net/wedding?retryWrites=true&w=majority';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB is started!'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/login', loginValidation, validationErrors, UserController.login);

app.post('/auth/register', registerValidation, validationErrors, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on port localhost:${PORT}...`);
});