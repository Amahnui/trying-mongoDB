const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo.js');
const {User} = require('./../../models/user.js');
const jwt = require('jsonwebtoken');


const todos = [{
  _id:  new ObjectID(),
  text: 'some new todo'
},{
    _id: new ObjectID(),
  text: 'testing new stuff',
  completed: true,
  completedAt: 677220194
}];

const userOneId = new ObjectID();
const userTwoId  = new ObjectID();

const users =[{
    _id: userOneId,
    email: 'amahnui@example.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token :  jwt.sign({_id: userOneId, access: 'auth'}, 'money').toString()
    }]
},{
  _id: userTwoId,
  email: 'amahjones@example.com',
  password: 'userTwoId'
}];


const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populatUsers = (done) =>{
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {populateTodos, todos, populatUsers, users };
