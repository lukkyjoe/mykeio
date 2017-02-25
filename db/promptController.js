const db = require('./promptSchema.js');

db.HostRoomData.create(
  {
    roomTitle: 'loomNumbaSISIG',
    prompts: [
      {
        responseType: 'MULTIPLE_CHOICE',
        promptText: 'Who is the greatest athlete ever?',
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
        trackAswers: false,
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
    if (err) { 
      console.error(err);
    } else {
      console.log(model);
    }
  }
);