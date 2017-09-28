const express = require('express');
const userQuestions = require("../utils/assessment-question.js");

module.exports.evaluate = function(req, res) {
    try {
        // Get all parameters to decide workflow
        var user = req.query.user;
        var email = req.query.email;
        var qid = req.query.qid;
        var ans = req.query.ans;
        var prev = req.query.prev

        // DEBUG: List what we received
        console.log("user: %s, email: %s, qid: %s, ans: %s, prev: %s", user, email, qid, ans, prev);;

        // Response model
        var retValue = {
            "user" : undefined,
            "email" : undefined,
            "question" : undefined,
            "results" : undefined,
            "success" : false,
            "status" : undefined,
            "isNext" : false,
            "isPrev" : false,
            "isLast" : false
        }

        if(user === undefined || email === undefined) {

            res.json(retValue);
            res.end();
        }   

        retValue.user = user;
        retValue.email = email;

        var nextResponse = userQuestions.getNextQuestion(user, email, qid, ans, (prev !== undefined));
        if(nextResponse !== undefined) {
            retValue.question = nextResponse.question;
            retValue.results = nextResponse.results;
            retValue.success = nextResponse.success;
            retValue.isNext = nextResponse.isNext;
            retValue.isPrev = nextResponse.isPrev;
            retValue.isLast = nextResponse.isLast;
        }

        if(retValue.results != undefined) {
            if(retValue.results.totalQuestions == retValue.totalAnswered) {
                retValue.status = "done";
            }
        }

        // Done
        res.json(retValue);
        res.end();

    } catch (e) {
        console.error(e);
        res.status(500).send('Unknown error. Please contact sys admin');
        res.end();
    }
} 