const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

var express = require('express')
,cors = require('cors')
, app = express();

//app.user(bodyParser.json());
// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
'http://192.168.182.131:4200',      //this is my front-end url for development
 'http://www.myproductionurl.com'
];
var corsOptions = {
origin: function(origin, callback){
      var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
      callback(null, isWhitelisted);
},
credentials:true
}
//here is the magic
app.use(cors(corsOptions));