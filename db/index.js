//Inilialize database connection
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/myke';
const Schema = mongoose.Schema;
const db = mongoose.connect(mongoUri);

const quizSchema = new Schema({
  title: String,
  topic: Array,
  questions: Array,
  responses: Array
})

const Quizzes = mongoose.model('Quizzes', quizSchema);
Quizzes.create({title: 'Quiz1'});

const questionSchema = new Schema({
  question: {type: String, text: String},
  answer: {type: String, text: String}
})

const responseSchema = new Schema({
  username: String,
  question: String,
  response: Array,
  ts: Timestamp
})

const usersSchema = new Schema({
  username: String,
  name: {first: String, last: String},
  cumulative_score: Number,
  handRaiseCount: Number
})