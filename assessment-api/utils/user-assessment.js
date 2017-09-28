var answers = require("../data/answers.json");
var fs = require("fs");

function markAsAnswer(user, email, qId, ans) {
    var userDataPath = (__dirname + "/../data/assessments.json");
    console.log("markAsAnswer: User Assessment Data Path: %s", userDataPath);

    var assessments = JSON.parse(fs.readFileSync(userDataPath));
    var userQuestions = assessments[email] || { "questions" : []};

    var idx = userQuestions.questions.findIndex(x => x.id == qId);
    console.log("markAsAnswer: Question index: %s", idx);
    if(idx === -1) {
        userQuestions.questions.push({"id" : qId, "value" : ans});
    } else {
        userQuestions.questions[idx] = {"id" : qId, "value" : ans};
    }

    assessments[email] = userQuestions;

    fs.writeFileSync(userDataPath, JSON.stringify(assessments));
}

function completeAssessment(user, email) {
    var retValue = undefined;

    var userDataPath = (__dirname + "/../data/assessments.json");
    console.log("completeAssessment: User Assessment Data Path: %s", userDataPath);

    var assessments = JSON.parse(fs.readFileSync(userDataPath));
    var userQuestions = assessments[email] || { "questions" : {}};
    
    if(userQuestions !== undefined && userQuestions.questions !== undefined && userQuestions.questions.length > 0) {

        retValue = {};
        var totalAnswered = 0;
        var totalScore = 0;
        userQuestions.questions.forEach(function(q){
            if(q.id !== undefined && q.id !== "results" && q.value != undefined) {
                totalAnswered += 1;
                if(answers[q.id] !== undefined && answers[q.id].answers !== undefined) {
                    console.log("completeAssessment: QuestionId: %s, User Answer: %s, correct answer: %s", q.id, q.value, answers[q.id].answers[q.value]);
                    if(!isNaN(answers[q.id].answers[q.value])) {
                        totalScore += answers[q.id].answers[q.value];
                    }
                }
            }
        });

        
        retValue.totalAnswered = totalAnswered;
        retValue.totalScore = totalScore;
        
        console.log("completeAssessment: Answered: %s, Score: %s", totalAnswered, totalScore);

        userQuestions.questions["results"] = retValue;

        assessments[email] = userQuestions;

        fs.writeFileSync(userDataPath, JSON.stringify(assessments));
    }

    return retValue;
}

module.exports = {
    markAsAnswer: markAsAnswer,
    completeAssessment : completeAssessment
}