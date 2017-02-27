
const express = require ('express');
const roomController = require('./../controllers/roomController.js');
const router = express.Router();

router.post('/createRoom', (req, res) => {
  if (!req.session) {
    req.session.serialized = true;
  }
  roomController.createNewRoom(req.session.id, req.body, (id)=>{
    res.send(id);
  });
});

router.get('/getRoom', (req, res)=>{
  roomController.getRoomInfo(req.query.roomid, (err, room)=>{
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(Object.assign({}, room, {
        adminSessionId: undefined
      }));

    }
  });
});

router.post('/updateHost', (req, res)=>{
  roomController.updateHostPeerId(req.body.roomid, req.session.id, req.body.peerid, (err, peer)=>{
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(peer);
    }
  });
});

module.exports = router;
