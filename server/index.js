import dotenv from 'dotenv';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import postUsers from './routes/users.js';
import postProfile from './routes/profile.js';
import postAuth from './routes/auth.js';
import postPosts from './routes/posts.js';

const app = express();

//connect database
connectDB();

//init middleware

app.use(express.json({ extended: false }));

app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(cors());
app.use('/users', postUsers);
app.use('/profile', postProfile);
app.use('/auth', postAuth);
app.use('/posts', postPosts);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
);

process.on('unhandledRejection', (error) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
});