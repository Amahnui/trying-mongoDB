 require('./config/config.js');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/todo');


var app = express();
const port = process.env.PORT;

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
  return res.status(404).send();
  }

  Todo.findById(id).then((todo) =>{
    if(!todo){
    return res.status(400).send();
    }
    res.send({todo});
  }, (e) =>{
    res.status(400).send();
  });

});

app.delete('/todos/:id', (req, res) =>{
  var id = req.params.id;
//res.send(req.params);

  if(!ObjectID.isValid(id)) {
  return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) =>{
    if(!todo){
    return res.status(400).send();
    }
    res.send({todo});
  }, (e) =>{
    res.status(400).send();
  });

});

app.patch('/todos/:id', (req, res) =>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']); //this array contains elementes tobe updated
  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();

  } else {
    body.completed = false;
    body.completedAt = null;
  }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});

    }).catch((e) => {
      res.status(400).send();
    })
});

app.listen(port, () =>{
  console.log(`start on port ${port}`);
});





module.exports = {app};
