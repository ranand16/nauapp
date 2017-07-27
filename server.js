var express = require('express');
var app = express();
var routes = require('server/routes');
var bodyParser = require('body-parser');
var config = require('./conf');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.database,{useMongoClient: true},function(err){
  if(err){
    console.log("There is a connection error");
  }
  else{
    console.log("connected to db");
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

routes(app);

var PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.all('/*',function(req,res){
  res.send('\
    <!doctype html>\
    <html>\
      <head>\
          <base href="/">\
          <title></title\
      </head>\
      <body>\
        <div ui-view><h1></h1></div>\
        <script type="text/javascript" src="bundle.js"></script>\
      </body>\
    </html>\
    ');
});
app.listen(PORT, function(){
  console.log("Its running !! @ localhost:"+PORT);
});
