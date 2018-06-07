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

   // db.collection('Todos').find({
   //   _id: new ObjectID('5b189067f6f31d30889f98d1')
   // }).toArray().then((docs) =>{
   //   console.log('Todos');
   //   console.log(JSON.stringify(docs, undefined,2));
   // }, (err) =>{
   //   console.log('Unable to fetch todos', err);
   // });
   db.collection('Todos').find().count().then((count) =>{
     console.log(`Todos counts ${count}`);
   }, (err) =>{
     console.log('Unable to fetch todos', err);
   });

   db.collection('Users').find({
     name: 'amako'
   }).toArray().then((docs) =>{
     console.log('names with james');
     console.log(JSON.stringify(docs, undefined,2));
   }, (err) =>{
     console.log('Unable to fetch todos', err);
   });

 });
