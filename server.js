var express = require("express");
var app = express();
var path=require('path');
var router = express.Router();
var parser=require('body-parser');
const fs = require('fs');

app.use(parser.urlencoded({extended : true}));

router.get('/comments', function(req, res){
  res.sendFile(path.join(__dirname, '/comments.json'));
});

router.post('/comments', function(req, res){
  var comments=require(path.join(__dirname, '/comments.json'));
  console.log('req.body = ', req.body, JSON.stringify(req.body));
  comments.push(req.body);
  fs.writeFile('./comments.json', JSON.stringify(comments));
  console.log(JSON.stringify(comments));
  res.send(JSON.stringify(comments));
});
app.use('/api', router);

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
