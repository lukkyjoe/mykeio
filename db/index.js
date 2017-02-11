//Inilialize database connection
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quizes = new Schema({
  title: String,
  topic: Array,
  questions: Array,
  responses: 
})

let responses = new Schema({
  username: String,
  question: String,
  response: Mixed
})

let userProfile = new Schema({
  username: String,
  cumulative_score: Number,
  handRaiseCount: Number
})