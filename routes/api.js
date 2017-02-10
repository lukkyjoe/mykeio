
const express = require ('express');
const roomController = require('./../controllers/roomController.js');
const router = express.Router();

router.get('/room/new',(req,res) => {
  if (!req.session){
    req.session.serialized = true;
  }
  roomController.createNewRoom(req.session.id,(err,room)=>{
    if (err){
      res.sendStatus(500);
    } else {
      console.log('redirecting to ' + '#/' + room.id);
      res.redirect('/#/'+ room.id);
    }
  })
});

module.exports = router;
