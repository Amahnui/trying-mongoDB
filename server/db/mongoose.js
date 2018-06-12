var mongoose = require('mongoose');

mongoose.Promise =global.Promise;
mongoose.connect(process.env.MONGODB_URI ); //'mongodb://localhost:27017/TodoApp'
    // .then(() => { // if all is ok we will be here
    //     console.log('');
    // })
    // .catch(err => { // if error we will be here
    //     console.error('App starting error:', err.stack);
    //     process.exit(1);
    // });

    module.exports = {mongoose};
