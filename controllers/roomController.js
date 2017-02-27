const Hashids = require('hashids');
const shortid = require('shortid');

let rooms = {};
let quantity = 0;

module.exports.createNewRoom = function(adminSessionId, roomData, callback) {
  const id = shortid.generate();
  console.log(roomData);
  rooms[id] = roomData;
  rooms[id].adminSessionId = adminSessionId;
  callback(id);
};

module.exports.getRoomInfo = function(roomId, callback) {
  if (rooms[roomId]) {
    callback(null, rooms[roomId]);
  } else {
    callback('room does not exist', null);
  }
}; 
 
module.exports.updateHostPeerId = function(roomId, requestSessionId, peerId, callback) {
  if (rooms[roomId].adminSessionId === requestSessionId && rooms[roomId]) {
    rooms[roomId].adminPeerId = peerId;
    callback(null, peerId);
  } else {
    callback('not auth');
  }
};
