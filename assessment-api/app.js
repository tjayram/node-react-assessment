const express = require('express')
const app = express()
const assessment = require('./controllers/assessment');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/assessment', function (req, res) {
    return assessment.evaluate(req, res);
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})