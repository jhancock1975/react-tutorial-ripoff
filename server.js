var express = require("express");
app = express();
path=require('path');
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.use('/', express.static(__dirname + '/public'));

console.log('__dirname = ', __dirname);
/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
 console.log('static file request : ' + req.params);
   res.sendFile( __dirname + req.params[0]);
});
//test
var port = process.env.PORT || 5000;
app.listen(port, function() {
 console.log("Listening on " + port);
});
