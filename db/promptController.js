const db = require('./promptSchema.js');

db.HostRoomData.create(
  {
    roomTitle: 'loomNumbaWon',
    prompts: [
      {
        type: 'MULTIPLE_CHOICE',
        promptText: 'Who smells the greatest?',
        trackAnswers: false
      },
      {
        type: 'MULTIPLE_CHOICE',
        promptText: 'Who runs the fastest?',
        trackAnswers: false,
        options: ['Usain Bolt', 'Phelps']
      }


    ]
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
  // function(err, model) {
  //   if (err) {console.error(err);}
  //   else {
  //     console.log(model);
  //   }
  // }
// )