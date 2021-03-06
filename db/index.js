//Inilialize database connection
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/myke';
const Schema = mongoose.Schema;
const db = mongoose.connect(mongoUri);

const quizSchema = new Schema({
  title: {type: String, unique: true},
  questionsAndAnswers: Array,
})

module.exports.quizzes = mongoose.model('Quizzes', quizSchema);

const questionAndAnswerSchema = new Schema({
  question: {type: String, unique: true},
  answer: {type: String}
})

module.exports.questionAndAnswer = mongoose.model('QuestionsandAnswers', questionAndAnswerSchema);

const responseSchema = new Schema({
  username: String,
  question: String,
  response: Array,
  ts: Date
})

const usersSchema = new Schema({
  username: String,
  name: {first: String, last: String},
  cumulative_score: Number,
  handRaiseCount: Number
})

const sessionSchema = new Schema({
  title: String,
  host: String
})