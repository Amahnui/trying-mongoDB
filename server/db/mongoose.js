var mongoose = require('mongoose');

mongoose.Promise =global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp')
    .then(() => { // if all is ok we will be here
        console.log('save todo');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

    module.exports ={mongoose};
