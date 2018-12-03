var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,  { useNewUrlParser: true });
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
});
mongoose.connection.on('connected', function() {
    console.info('Successfully connected to the database')
});

mongoose.set('useCreateIndex', true);