require('dotenv').config();
const User = require('../models/user');
const {hash} = require('./authController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = process.env.SECRET;
const express = require('express');
const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    let {email, password} = req.body;
    password = hash(password);
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    try{
        const newUser = await User.create({email, password})
        const token = jwt.sign(
            {
                email: newUser.email, 
                id: newUser._id
            }, SECRET);
        res.json({
            token,
            authorized: true,
            username: newUser.email
        });
        res.status(200);
        res.redirect('/vote');
        console.log("A new user has been created");
    }
    catch(err){
        res.status(400).json(err)
    }
})

userRouter.post('/', async (req, res) => {
    let {email, password} = req.body;
    password = hash(password);
    try{
        const userQuery = User.findOne({email}).select('password email');
        const foundUser = await userQuery.exec();
        if(bcrypt.compareSync(password, foundUser.password)){
            const token =jwt.sign(
                {
                    email: foundUser.email,
                    id: foundUser._id
                }, SECRET
            );
            res.status(200).json(
                {
                    token,
                    authorized: true,
                    userName: foundUser.email
                }
            );
            res.redirect('/vote');
            console.log("You have logged in");
        }else{
            res.send(400).json({
                message: 'Incorrect username or password.'
            })
        }
    }catch(err){
        console.error(err);
        res.status(400).json(error);
    }
})

module.exports = userRouter;

//User should be able to GET all seed data in a listed format.
//User should be able to SHOW 1 question in a modal and see a corresponding chart.
//User to be able to POST a new vote, which updates the existing votes and charts.
//User should be able to edit their vote at anytime, which updates the existing votes and charts.
//all of the above routes will be authorized only if the user logs in.
