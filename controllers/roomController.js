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

  callback(null,rooms[id]);
}
