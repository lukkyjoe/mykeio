const db = require('./promptSchema.js');

db.HostRoomData.create(
  {
    roomTitle: 'loomNumbaSISIG',
    prompts: [
      {
        responseType: 'MULTIPLE_CHOICE',
        promptText: 'Who is the greatest athlete ever?',
        trackAnswers: false,
        giveFeedback: false,
        options: [
          {
            choiceText: 'Jordan',
            correctAnswer: true
          }, 
          {
            choiceText: 'Federer',
            correctAnswer: true
          }, 
          { choiceText: 'Bolt',
            correctAnswer: 23
          }
        ]
      },
      {
        responseType: 'MULTIPLE_CHOICE',
        promptText: 'Who is the greatest musician?',
        trackAnswers: false,
        giveFeedback: false,
        options: [
          {
            choiceText: 'Muse',
            correctAnswer: true
          }, 
          {
            choiceText: 'Muse',
            correctAnswer: true
          }, 
          { choiceText: 'Coldplay',
            correctAnswer: 23
          }
        ]
      }
    ]
  }, 
  function(err, model) {
    if (err) {console.error(err);}
    else {
      console.log(model);
    }
  }
);
//test create a quiz
// db.quizzes.create({
//     title: "time complexity quiz",
//     questions: ["q1", "q2"]});

//test add question to existing quiz
// db.quizzes.update({title: 'time complexity quiz'}, {$push: {questions: "q3"}}, 
//   {safe: true, upsert: true, new : true},
//   function(err, model) {
//     console.error(err);
//     console.log(model);
//   }
// );

//test create entry
// db.questionAndAnswer.create(
//   {question: "this is question 3", answer: "this is answer 3"}, 
//   function(err, model) {
//     if (err) {console.error(err);}
//     else {
//       console.log(model);
//     }
//   }
// )