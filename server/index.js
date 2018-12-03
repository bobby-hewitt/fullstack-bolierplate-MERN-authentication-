var app = require('./app');
var port = process.env.PORT || 9000;

app.get('/', function(){
    console.log('hello world')
})

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});