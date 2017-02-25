//Inilialize database connection
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/myke';
const Schema = mongoose.Schema;
const db = mongoose.connect(mongoUri);

const hostRoomSchema = new Schema({
  roomTitle: {type: String, unique: true},
  prompts: [
    {
      responseType: String,
      promptText: String,
      giveFeedback: Boolean,
      options: [
        {
          choiceText: String,
          correctAnswer: Boolean,
        }
      ],
    }
  ],
});

module.exports.HostRoomData = mongoose.model('HostRoomData', hostRoomSchema);
