const db = require('./index.js');

module.exports.createQuiz = function(req, res) {
  //create a quiz
  db.quizzes.create({
    title: req.body.title,
    questions: [],
  }, function(err) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.sendStatus(201);
    }
  })
};

module.exports.retrieveAllQuizzes = function(req, res) {
  db.quizzes.find({}, function(err, results) {
    if (err) {
      console.error(err);
    }
    else {
      res.send(results);
    }
  })
}

module.exports.findQuiz = function(req, res) {
  db.quizzes.find({title: req.body.title}, function(err, results) {
    if (err) {
      console.error(err);
    }
    else {
      res.send(results);
    }
  })
}

module.exports.createQuestion = function(req, res) {
  //create question for quiz
  db.questions.create({
    question: req.body.question,
    type: req.body.type,
    answer: req.body.answer,
  }, function(err) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.sendStatus(201);
    }
  })
};

module.exports.deleteQuestion = function(req, res) {
  //delete a question
};

module.exports.createResponse = function(req, res) {
  //create a response
};

module.exports.createScore = function(req, res) {
  //create a score for a quiz
};


module.exports.updateScore = function(req, res) {
  //update a score for a quiz
};

module.exports.createQuestion = function(req, res) {
  //create question for quiz
};