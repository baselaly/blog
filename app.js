const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv/config');

// import routes
const PostRoutes = require('./routes/posts')
const UserRoutes = require('./routes/users')

//ROUTES
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/posts', PostRoutes);
app.use('/users', UserRoutes)
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('conned to DB'));
app.listen(3000)