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
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

//validation
import { registerValidation } from './validations/auth.js'

//models
import UserModel from './models/user.js'

//utils
import checkAuth from './utils/checkAuth.js';

mongoose.connect('mongodb+srv://luxurypluxury:28082004r@wedding.fwhc0ye.mongodb.net/wedding?retryWrites=true&w=majority')
    .then(() => console.log('DB is started!'))
    .catch((err) => console.log('DB error', err));

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: 'User is not found'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(400).json({
                message: 'Password or login is incorrect'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to auth'
        });
    }
})

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to register'
        });
    }
})

app.get('/auth/me', checkAuth, async (req, res) => {
    try {
        res.json({
            success: true
        })
    } catch (err) {

    }
})

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on port localhost:${PORT}...`);
});