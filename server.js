require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const totalController = require('./controllers/totalController');

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
app.use('/', userController);
app.use('/vote', totalController);
app.use(express.urlencoded({extended:false}));




app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`));