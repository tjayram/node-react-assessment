var answers = require("../data/answers.json");
var fs = require("fs");

function markAsAnswer(user, email, qId, ans) {
    var userDataPath = (__dirname + "/../data/assessments.json");
    console.log("User Assessment Data Path: %", userDataPath);

    var assessments = JSON.parse(fs.readFileSync(userDataPath));
    var userQuestions = assessments[email] || { "questions" : {}};
    userQuestions.questions[qId] = ans;

    assessments[email] = userQuestions;

    fs.writeFileSync(userDataPath, JSON.stringify(assessments));
}

function completeAssessment(user, email) {

}

module.exports = {
    markAsAnswer: markAsAnswer,
    completeAssessment : completeAssessment
}