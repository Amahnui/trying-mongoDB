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
//delet many
   // db.collection('Todos').deleteMany({
   //   text: 'cook something'
   // }).then((result) =>{
   //   console.log(result);
   // });
//delet one : deletes only one
  // db.collection('Todos').deleteOne({
  //   text: 'cook something'
  // }).then((result) =>{
  //   console.log(result);ObjectId("5b188f9db3ce4e30808c9147")
  // });
//findOne and deletes

db.collection('Users').findOneAndDelete({
_id: new ObjectID('5b188f9db3ce4e30808c9147')
 }).then((result) =>{
  console.log(result);
});



 });
