const express = require('express');
const userQuestions = require("../utils/assessment-question.js");

module.exports.evaluate = function(req, res) {
    try {
        // Below are few possibilities: Using same end point as that is requirement
        // 1. User is just starting assessment - Then take User Name and User Email
        // 2. User provided User Name and Email:
        //  2.1: See if user already took assessment - if so just display score and dont allow re-take [current version]
        //  2.2: User is new: Display first question if question id is not provided
        //  2.3: If question id is provided: Don't let user skip previous question if user has not answered 
        //  2.4: If question id is answered - mark answer and show next question
        // 3. If all questions are over and there is no next question - show results

        // Get all parameters to decide workflow
        var user = req.query.user;
        var email = req.query.email;
        var qid = req.query.qid;
        var ans = req.query.ans;

        // DEBUG: List what we received
        console.log("user: %s, email: %s, qid: %s, ans: %s", user, email, qid, ans);

        var retValue = {
            "user" : { 
                "name" : user,
                "email" : email 
            },
            "question" : undefined,
            "results" : undefined,
            "sucess" : false,
            "status" : undefined
        }

        if(user === undefined || email === undefined) {

            res.json(retValue);
            res.end();
        }   

        retValue = userQuestions.getNextQuestion(user, email, qid, ans);

        // Done
        res.json(retValue);
        res.end();

    } catch (e) {
        console.error(e);
        res.status(500).send('Unknown error. Please contact sys admin');
        res.end();
    }
} 