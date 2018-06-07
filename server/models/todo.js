var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    require: true,
    minlength: 1,
    trim: true,
    type: Number
  }
});

module.exports= {Todo};
