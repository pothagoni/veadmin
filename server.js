var express = require('express')
var port = 8081;
var app = express();
app.use(express.static(__dirname+"/public"));

app.listen(port, function(){
	console.log("Application listerning on port "+port);
})