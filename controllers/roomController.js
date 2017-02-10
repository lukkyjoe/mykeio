const Hashids = require('hashids');
let hashids = new Hashids("this is my salt", 6, "abcdefghijklmnopqrstuvwxyz1234567890");

let rooms = {};
let quantity = 0;

module.exports.createNewRoom = function(adminId, callback){
  console.log('room created')
  const id = hashids.encode(quantity);
  quantity++;

  rooms[id] = {
    id:id,
    adminId:adminId,
    clients:[],
  }

  callback(null, rooms[id]);
}

module.exports.getRoomInfo = function(roomId, callback){
  if (rooms[roomId]){
    callback(null, rooms[roomId]);
  }else{
    callback("room does not exist", null);
  }
}

module.exports.updateHostPeerId = function(roomId, requestId, peerId,callback){
  if (rooms[roomId].adminId === requestId && rooms[roomId]){
    rooms[roomId].adminPeer = peerId;
    callback(null,peerId);
  }else {
    callback('not auth');
  }
}
