require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const mongoose = require('mongoose');
const {hash, auth} = require('./controllers/authController');
const userController = require('./controllers/userController');

//mongoose connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: false,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error(err));


//middleware
app.use(express.json())
app.use(cors());
app.use('/', userController)

//Routes INDUCES CRUD
//Index Read
app.get('/vote', (req, res) =>{
    res.send("Hello World")
})
//Show one vote and corresponding chart
//Create a vote and update data
//Edit user vote and update data



app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`));