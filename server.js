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
app.get('/vote', auth,  (req, res) =>{
    res.json(
        politicalPoll = {
            voterDemographic = [ 
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
            currentLeadership = [
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
            currentSystem = [
                {
                    question: "Do you believe in the impeachment process in the United States?",
                    answer: ["Yes", "No", "I don't know", "Sometimes"]
                },
                {
                    question: "Are you in favor of or against mail-in voting?",
                    answer: ["Completely in favor", "Somewhat in favor", "I don't know", "I don't care", "Somewhat against", "Completely Against"]
                }
            ],
            economics = [
                {
                    question: "Thinking about the job situation in America today, would you say that it is a good time to find a quality job?",
                    answers: ["Very good time", "Somewhat good time", "I don't know", "Somewhat not a good time", "Not a good time"]
                },
                {
                    question: "How would you rate economic conditions in this country, 10 = great 1 = poor?",
                    answers: ["10", "9", "8", "7", "6","5","4","3","2","1"]
                }
        
            ],
            forgeignPolicy = [
                {
                    question: "Do you think it best for the future of our country if we take an active part in world affairs or if we stay uninvolved?",
                    answers: ["Yes", "No", "Sometimes"]
                }
            ]
            // defense = [
        
            // ],
            // climate = [
        
            // ],
            // healthCare = [
        
            // ],
            // civilRights = [
        
            // ],
        }
    )
})
//Show one vote and corresponding chart
//Create a vote and update data
//Edit user vote and update data



app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`));