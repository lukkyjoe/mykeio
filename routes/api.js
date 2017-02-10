
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
      res.redirect('/#/'+ room.id);
    }
  })
});

router.get('/room/info/:roomid',(req, res)=>{
  roomController.getRoomInfo(req.params.roomid, (err,room)=>{
    if (err){
      res.sendStatus(500);
    } else {
      res.send(room);
    }
  })
});

module.exports = router;
