var express = require('express'),
	bodyParser = require('body-parser'),
	port = 8080;



var app = express();

var config = {
	root: './app'
};

app
	.use(bodyParser())
	.use(express.static(config.root))
	.listen(port);

console.log('app listening on port', port);