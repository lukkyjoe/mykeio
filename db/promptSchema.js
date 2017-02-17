//Inilialize database connection
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/myke';
const Schema = mongoose.Schema;
const db = mongoose.connect(mongoUri);

const hostRoomSchema = new Schema({
  roomTitle: {type: String, unique: true},
  prompts: [
    {
      type: String,
      promptText: String,
      trackAnswers: Boolean,
      giveFeedback: Boolean,
      options: [
        {
          choiceText: String,
          correctAnswer: Boolean,
        }
      ],
    }
  ],
})

module.exports.hostRoomData = mongoose.model('HostRoomData', hostRoomSchema);

// const promptSchema = new Schema({
//   type: String,
//   promptText: String,
//   trackAnswers: Boolean,
//   giveFeedback: Boolean,
//   options: [
//     {
//       choiceText: String,
//       correctAnswer: Boolean,
//     }
//   ],
// })

// module.exports.promptData = mongoose.model('PromptData', promptSchema);

// const responseSchema = new Schema({
//   choiceText: String,
//   correctAnswer: Boolean,
// })

// module.exports.responseData = mongoose.model('ResponseData', responseSchema);


// const questionAndAnswerSchema = new Schema({
//   question: {type: String, unique: true},
//   answer: {type: String}
// })

// module.exports.questionAndAnswer = mongoose.model('QuestionsandAnswers', questionAndAnswerSchema);

// const responseSchema = new Schema({
//   username: String,
//   question: String,
//   response: Array,
//   ts: Date
// })

// const usersSchema = new Schema({
//   username: String,
//   name: {first: String, last: String},
//   cumulative_score: Number,
//   handRaiseCount: Number
// })

// const sessionSchema = new Schema({
//   title: String,
//   host: String
// })