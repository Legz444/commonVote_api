require('dotenv').config();
const Totals = require('../models/totals');
const {auth} = require('./authController');
const express = require('express');
const totalsRouter = express.Router();

totalsRouter.post('/totals', auth, async (req, res) => {  
    let {totals} = req.body;
    try{
        const newVote = await Totals.create({totals})
        res.status(200).json({
            authorized: true,
            totals: newVote.totals
        })
    }catch(err){
        console.error(err)
        res.status(400).json(err);
    }
})





module.exports = totalsRouter;