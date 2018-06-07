// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


 MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
     var db = client.db('TodoApp');
   if (err) {
  return   console.log('unable to connect to mongodb server');
   }
   console.log('connected to MonogDB server');

// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID("5b18866d5e01c82ba4c9aa99")
// }, {
//   $set : {
//     completed: true
//   }
// }, {
//   returnOriginal: false
// }).then((result) =>{
//   console.log(result);
// });

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID("5b188fe01ddf5f325027fc68")
}, {
  $set : {
    location: 'baffousam'
  }
}, {
  returnOriginal: false
}).then((result) =>{
  console.log(result);
});

db.collection('Users').update(
  {
    _id: new ObjectID("5b188fe01ddf5f325027fc68")
  },
   { $inc: { age: -10 } });

 });
