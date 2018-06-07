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

   // db.collection('Todos').insertOne({
   //   text: ' something to do',
   //   completed: false
   // }, (err, result) =>{
   //   if (err){
   //      return console.log('unable to insert todo', err);
   //   }
   //   console.log(JSON.stringify(result.ops, undefined, 2));
   // });
   //
   // db.collection('Users').insertOne({
   //   name: 'amako james',
   //   age: 25,
   //   location: 'limbe cameroon'
   // }, (err, result) =>{
   //   if (err){
   //      return console.log('unable to insert user', err);
   //   }
   //   console.log(result.ops[0]._id.getTimestamp());
   // });

   // db.close();
 });
