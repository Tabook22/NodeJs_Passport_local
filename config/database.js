//---------------------Method one-------------------------------
// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017/loginapp', function(err, db) {
//     if (err) { console.error(err); } 
//     else {
//        db.collection('users').find({}).toArray(function(err, docs) {
//           console.log(docs);
//        });
//     }
// })

//-----------------------Method two----------------------------
// var mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost:27017/loginapp');
// module.exports.connect=function(callback){
//     var db=mongoose.connection;
//     db.on("error", console.error.bind(console,"connection error"));
//     db.once("open",function(callback){
//         console.log("connection successed.");
//     });
//     callback()
// };

//---------------------Method three------------------------------
// This file contains private configuration details.
// Do not add it to your Git repository.
// module.exports = {
//   "mongodbHost" : "localhost"
// };

//--------------------Method four ------------------------------
// config/database.js
module.exports = {

    'url' : process.env.DBL_URI // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};