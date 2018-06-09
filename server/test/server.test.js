const _ = require('lodash');
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app}  =  require('./../server');
const {Todo} = require('./../models/todo.js');


const todos = [{
  _id:  new ObjectID(),
  text: 'some new todo'
},{
    _id: new ObjectID(),
  text: 'testing new stuff',
  completed: true,
  completedAt: 677220194
}];

beforeEach((done) =>{
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() =>done());
});


describe('POST /todos ',() =>{

  it('should create a new todo', () => {
    var text = 'test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) =>{
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) =>{
          expect(todos.length).toBe(2);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
 });
  it('should verify that body was not created', (done) => {
    // beforeEach((done) =>{
    //   Todo.remove({}).then(() =>don());
    // });
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({todos}).then((todos) =>{
          expect(todos.length).toBe(0);
           done();
        }).catch((e) => done(e));
      });
  });
});
// beforeEach((done) =>{
//   Todo.remove({}).then(() =>don());
// });

describe('GET /todos', () => {
  it('should get all todos', (done) =>{
    request(app)
      .get('/todos')
      .expect((res) =>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET/todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) =>{
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    var id = new ObjectID();
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .end(done);
  });

  it('should return return 404 for non-object ids', (done) => {
    request(app)
    .get('/todos/1326kh')
    .expect(404)
    .end(done);
  });
});

describe('DELETE/todos/:id', () => {
  var hexId = todos[1]._id.toHexString();
  it('should remove a todo', (done) => {
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) =>{
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err, res) =>{
      if (err) {
        return done(err);
      }
      Todo.findById(hexId).then((todo) =>{
        expect(todo).toBeFalsy();
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return a 404 if todo not found', (done) => {
    var id = new ObjectID();
    request(app)
    .delete(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .end(done);
  });

  it('should return return 404 for non-valid object id ids', (done) => {
    request(app)
    .delete('/todos/1326kh')
    .expect(404)
    .end(done);
  });
});
//todo[0]._id
describe('PATCH /todos/:id', () => {


  it('should update the todo', (done) =>{
    var hexId = todos[0]._id.toHexString();
    var text = 'this is some new test';
    request(app)
    .patch(`/todo/${hexId}`)
    .send({
      completed: true,
      text
    })
    //.expect(202)
    .expect((res) =>{
      expect(res.body.todo.text).toBe({text});
      expect(res.body.todo.completed).toBe(true);
      expect(typeof res.body.todo.completedAt).toBeA(Number);
    }).end(done);
  });

  it('should clear completedAt when todo is not completed', (done) =>{
    var hexId = todos[1]._id.toHexString();
    var sText = 'this isthe second time';
    request(app)
    .patch(`/todo/${hexId}`).send({sText, completed: false})
    //.expect(200)
    .expect((res) =>{
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toBeFalsy();
    }).end(done);

  });
});
