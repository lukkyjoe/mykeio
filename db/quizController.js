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

module.exports.addToQuiz = function(req, res) {
  //add a question to a quiz
  db.quizzes.update({title: req.body.title}, {$push: {questions: req.body.question}}, 
    {safe: true, upsert: true, new : true},
    function(err, model) {
      if (err) {
        console.error(err);
      }
      else {
        console.log(model);
    }
    }
  );
}

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
const qa = require('./index.js');


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

//test create a quiz
// db.quizzes.create({
//     title: "time complexity quiz",
//     questions: ["q1", "q2"]});

//test add question to existing quiz
db.quizzes.update({title: 'time complexity quiz'}, {$push: {questions: "q3"}}, 
  {safe: true, upsert: true, new : true},
  function(err, model) {
    console.error(err);
    console.log(model);
  });

