//Inilialize database connection
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/myke';
const Schema = mongoose.Schema;
const db = mongoose.connect(mongoUri);

const quizSchema = new Schema({
  title: {type: String, unique: true},
  questions: Array,
})

module.exports.quizzes = mongoose.model('Quizzes', quizSchema);

const questionSchema = new Schema({
  question: {type: String, text: String},
  answer: {type: String, text: String}
})

module.exports.question = mongoose.model('Questions', questionSchema);

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