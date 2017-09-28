var lodash = require("lodash");
var questions = require("../data/questions.json");
var userAssessment = require("./user-assessment.js");

// Get Next Question:
function getNextQuestion(user, email, currentQId, currentAns, prev) {
    var retValue = {};

    // Get current question index
    var qIdx = 0;
    if(currentQId !== undefined) {
        qIdx = questions.findIndex(x => x.id == currentQId);
    }
    console.log("Current question index: %s", qIdx);

    // Mark current answer
    if(qIdx !== -1 && currentQId !== undefined && currentAns !== undefined) {
        // Record the answer
        userAssessment.markAsAnswer(user, email, currentQId, currentAns);
    }

    // Get next question
    if(currentQId === undefined) {
        retValue.isFirst = true;
        retValue.question = questions[qIdx];
        retValue.status = "Step 1 of " + questions.length;
    } else {
        if(qIdx !== -1) {
            if(prev) {
                if(qIdx === 0) {
                    retValue.isFirst = true;
                    retValue.status = "Step 1 of " + questions.length;
                } else {
                    retValue.isPrev = (qIdx-1 > 0);
                    retValue.question = questions[qIdx-1];
                    retValue.status = "Step " + (qIdx) + " of " + questions.length;
                }
            } else {
                if(qIdx < (questions.length - 1)) {
                    retValue.isPrev = true;
                    retValue.question = questions[qIdx+1];
                    retValue.status = "Step " + (qIdx+1+1) + " of " + questions.length;
                } else {
                    retValue.isLast = true;
                    retValue.isPrev = true;
                    retValue.status = "Step " + questions.length + " of " + questions.length;
                }
            }
        }
    } 

    retValue.success = true;

    // If this is last question, display final summary/results
    if(retValue.isLast === true) {
        console.log("getNextQuestion: Completing User Assessment");
        retValue.results = userAssessment.completeAssessment(user, email);
        retValue.results.totalQuestions = questions.length;

        // If not all questions answered - don't show score
        if(retValue.results.totalQuestions !== retValue.results.totalAnswered) {
            retValue.results.totalScore = undefined;
        }
    }
    
    return retValue;
}

module.exports = {
    getNextQuestion : getNextQuestion
}