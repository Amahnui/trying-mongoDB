var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/todo');


var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
  var todo = new Todo({
    text: req.body.text,
    completedAt: req.body.completedAt
  });
  todo.save().then((doc) =>{
    res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
  });
});

app.get('/todos', (req,res) =>{
  Todo.find().then((todos) =>{
    res.send({todos});
  }, (e) =>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) =>{
  var id = req.params.id;
//res.send(req.params);

  if(!ObjectID.isValid(id)) {
  res.status(404).send();
  }

  Todo.findById(id).then((todo) =>{
    if(!todo){
    res.status(400).send();
    }
    res.send({todo});
  }, (e) =>{
    res.status(400).send();
  });

});


app.listen(3000, () =>{
  console.log('start on port 3000');
});



module.exports = {app};
