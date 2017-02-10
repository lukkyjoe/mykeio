
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
      console.log('sending room data to new host');
      res.send(room);
    }
  })
});

router.get('/room/info/:roomid',(req, res)=>{
  roomController.getRoomInfo(req.params.roomid, (err,room)=>{
    if (err){
      res.sendStatus(500);
    } else {
      res.send({
        room:room,
        isAdmin:(req.session.id === room.adminId)
      });
    }
  })
});

router.post('/room/updateHostPeer/:id',(req, res)=>{
  roomController.updateHostPeerId(req.params.id, req.session.id, req.body.peerID,(err, peer)=>{
    if (err){
      res.sendStatus(401);
    } else {
      res.send(peer);
    }
  })
})

module.exports = router;
