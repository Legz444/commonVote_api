require('dotenv').config();
const User = require('../models/user');
const {hash, auth} = require('./authController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = process.env.SECRET;
const express = require('express');
const userRouter = express.Router();

userRouter.get('/vote', auth, (req, res) => {
    res.json({
            voterDemographic: [ 
                {
                    question: "What is your political affiliation?",
                    answers: [ "Democrat", "Green Party", "Independant", "Libertarian", "Other", "Republican", "Unaffiliated"]
                },
                {
                    question: "Have you been a member of the same political party your entire voting career?",
                    answers: [ "Yes", "No", "Changed once", "Changed twice", "Changed more than 3 times"]
                },
                {
                    question: "Do you vote in national elections?",
                    answers: ["Always", "Never", "More than half the time", "Half the time", "Less than half the time"]
                },
                {
                    question: "Do you vote in local elections",
                    answers: ["Always", "Never", "More than half the time", "Half the time", "Less than half the time"]
                },
                {
                    question: "How likely are you to vote in upcoming elections?",
                    answers: ["Very Likely", "Somewhat Likely", "I dont know", "Somewhate Unlikely", "Very Unlikely"]
                },
                {
                    question: "How many national elections have you voted in?",
                    answers: ["none", "1-5", "5-10", "10-15", "15-20", "20+"]
                },
                {
                    question: "Do you always vote for candidates in your political party?",
                    answer: ["Always", "Never", "More than half the time", "Half the time", "Less than half the time"]
                },
                {
                    question: "Do you believe that political polls are fairly accurate?",
                    answer: ["Always", "Never", "More than half the time", "Half the time", "Less than half the time"]
                }  
            ],
            currentLeadership: [
                {
                    question: "How would you rate the president on their ability to effectively fill their roll? 10 being perfectly effective and 1 being completely ineffective.",
                    answers: ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]
                },
                {
                    question: "How would you rate the Electoral College on their ability to effectively fill their roll? 10 being perfectly effective and 1 being completely ineffective.",
                    answers: ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]
                },
                {
                    question: "Do you GENERALLY trust elected political figures?",
                    answers: ["Yes", "No", "Only Members in my affiliated party"]
                },
                {
                    question: "GENERALLY How confident are you in the ability of world leaders to address the world’s biggest challenges?",
                    answer: ["Very Confident", "Somewhat Confident", "I don't know", "Less Confident", "Not confident at all"]
                }
            ],
            currentSystem:[
                {
                    question: "Do you believe in the impeachment process in the United States?",
                    answers: ["Yes", "No", "I don't know", "Sometimes"]
                },
                {
                    question: "Are you in favor of or against mail-in voting?",
                    answers: ["Completely in favor", "Somewhat in favor", "I don't know", "I don't care", "Somewhat against", "Completely Against"]
                }
            ],
            economics:[
                {
                    question: "Thinking about the job situation in America today, would you say that it is a good time to find a quality job?",
                    answers: ["Very good time", "Somewhat good time", "I don't know", "Somewhat not a good time", "Not a good time"]
                },
                {
                    question: "How would you rate economic conditions in this country, 10 = great 1 = poor?",
                    answers: ["10", "9", "8", "7", "6","5","4","3","2","1"]
                }
        
            ],
            foreignPolicy:[
                {
                    question: "Do you think it best for the future of our country if we take an active part in world affairs or if we stay uninvolved?",
                    answers: ["Yes", "No", "Sometimes"]
                }
            ]
        }
    )
})

//When the user has voted, post their vote into their user data//
userRouter.post('/vote', auth, async (req, res) => {
    try{
        const newVote = await User.create(req.body)
        res.status(200).json(newVote)
    }catch(err){
        res.json(err).status(404)
    }
})
// userRouter.post('/vote', auth, async (req, res) => {  
//     let {email, votes} = req.body;
//     try{
//         const userQuery = User.findOne({email}).select('email votes');
//         const foundUser = await userQuery.exec();
//         if(bcrypt.compareSync(email, foundUser.email)){
//         const newVote = await foundUser.create({votes})
//         res.status(200).json({
//             authorized: true,
//             votes: newVote.votes
            
//         })}else{
//             res.send(400).json({
//                 message: 'Could not post vote'
//             })
//         }
//     }catch(err){
//         console.error(err)
//         res.status(400).json(err);
//     }
// })

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
            email: newUser.email,
            id: newUser._id
        });
        res.status(200);
        console.log("A new user has been created");
        res.redirect('/vote');
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
                    userName: foundUser.email,
                    id: foundUser._id
                }
            )           
        }else{
            res.send(400).json({
                message: 'Incorrect username or password.'
            })
        }
    }catch(err){
        console.error(err);
        res.send(400).json(err);
    }
})

module.exports = userRouter;

//User should be able to GET all seed data in a listed format.
//User should be able to SHOW 1 question in a modal and see a corresponding chart.
//User to be able to POST a new vote, which updates the existing votes and charts.
//User should be able to edit their vote at anytime, which updates the existing votes and charts.
//all of the above routes will be authorized only if the user logs in.
