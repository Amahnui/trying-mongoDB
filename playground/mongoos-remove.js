const {ObjectID} = require('mongodb');

const {mongoose} =  require('./../server/db/mongoose');
const {Todo}     =  require('./../server/models/todo');
const {User}     =  require('./../server/models/user');

// Todo.findOneAndRemove({_id:'5b1a4c1c7a51922facecc2fc'}).then((todo) =>{
//   console.log(todo);
// });
Todo.findByIdAndRemove('5b1a4c1c7a51922facecc2fc').then((todo) =>{
  console.log(todo);
});
