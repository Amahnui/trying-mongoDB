var express = require('express');
var bodyParser = require('body-parser');

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

app.listen(3000, () =>{
  console.log('start on port 3000');
});


module.exports = {app};
