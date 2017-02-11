//Inilialize database connection
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/myke';
const Schema = mongoose.Schema;

const Quizzes = mongoose.model('Quizzes', quizSchema);

let quizSchema = new Schema({
  title: String,
  topic: Array,
  questions: Array,
  responses: Array
})

let responseSchema = new Schema({
  username: String,
  question: String,
  response: Mixed
})

let userProfileSchema = new Schema({
  username: String,
  cumulative_score: Number,
  handRaiseCount: Number
})