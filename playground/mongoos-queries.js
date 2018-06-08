const {ObjectID} = require('mongodb');

const {mongoose} =  require('./../server/db/mongoose');
const {Todo}     =  require('./../server/models/todo');
const {User}     =  require('./../server/models/user');

var id='5b19c41ad18ac736d2caa172';

if(!ObjectID.isValid(id)) {
  console.log('invalid id');
}

User.find({
  _id: id
}).then((users) =>{
  console.log('users', users);
});
User.findOne({
  _id: id
}).then((user) =>{
  if(!user){
    console.log( 'woops id not found');
  }
  console.log('User', user);//.catch((e) => done(e));
});

// User.findById(id).then((user) =>{
//   if(!user){
//     console.log('nothing found');
//   }
//   console.log('Todo by Id', user);
// }).catch((e) =>{
//   console.log(e);
// });
// Todo.find({
//   _id: id
// }).then((todos) =>{
//   console.log('Todos', todos);
// });
// Todo.findOne({
//   _id: id
// }).then((todo) =>{
//   if(!todo){
//     console.log( 'woops id not found');
//   }
//   console.log('Todo', todo);//.catch((e) => done(e));
// });

// Todo.findById(id).then((todo) =>{
//   if(!todo){
//     console.log('nothing found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) =>{
//   console.log(e);
// });
