var lodash = require("lodash");
var questions = require("../data/questions.json");
var userAssessment = require("./user-assessment.js");

// Get Next Question:
//  - Returns correct Next Question - if user skipped jumped 
//  - Returns next question if current question is answered
//  - Returns undefined if all questions are answered
function getNextQuestion(user, email, currentQId, currentAns) {
    var retValue = undefined;

    // Mark current answer
    if(currentQId !== undefined && currentAns !== undefined) {
        
        // Make sure question is valid
        var idx = questions.findIndex(x => x.id == currentQId);
        if(idx >= 0) {
            // Record the answer
            userAssessment.markAsAnswer(user, email, currentQId, currentAns);
        }
    }

    // Get next question
    var idx = questions.findIndex(x => x.id == currentQId);
    if(idx !== undefined) {
        if(idx < (questions.length - 1)) {
            retValue = questions[idx+1];
        } else {
            retValue = "done";
        }
    } 
    
    return retValue;
}

module.exports = {
    getNextQuestion : getNextQuestion
}