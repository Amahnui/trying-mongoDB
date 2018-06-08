const expect = require('expect');
const request = require('supertest');

const {app}  =  require('./../server');
const {Todo} = require('./../models/todo.js');


const todos = [{
  text: 'some new todo'
},{
  text: 'testing new stuff'
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
          expect(todos.length).toBe(1);
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
          expect(todos.length).toBe(2);
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
