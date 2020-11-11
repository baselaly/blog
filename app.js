const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv/config');

// import routes
const PostRoutes = require('./routes/posts')

//ROUTES
app.use(express.json())
app.use('/posts', PostRoutes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('conned to DB'));
app.listen(3000)