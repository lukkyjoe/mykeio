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

const responseSchema = new Schema({
  username: String,
  question: String,
  response: Array
})

const userProfileSchema = new Schema({
  username: String,
  cumulative_score: Number,
  handRaiseCount: Number
})