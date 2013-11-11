var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();
var server = http.createServer(app)

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require("socket.io").listen(server)

//Socket.io Server
io.sockets.on('connection', function (socket) {

 socket.on("screen", function(data){
   socket.type = "screen";
   ss = socket;
   console.log("Screen ready...");
 });
 socket.on("remote", function(data){
   socket.type = "remote";
   console.log("Remote ready...");
 });

 socket.on("controll", function(data){
	console.log(data);
   if(socket.type === "remote"){

     if(data.action === "tap"){
         if(ss != undefined){
            ss.emit("controlling", {action:"enter"});
            }
     }
     else if(data.action === "swipeLeft"){
      if(ss != undefined){
          ss.emit("controlling", {action:"goLeft"});
          }
     }
     else if(data.action === "swipeRight"){
       if(ss != undefined){
           ss.emit("controlling", {action:"goRight"});
           }
     }
   }
 });
});

var remote = io
  .of('/remote')
  .on('connection', function (socket) {
    socket.on("screen", function(data){
	   socket.type = "screen";
	   ss = socket;
	   console.log("Screen ready...");
	 });
    socket.on("remote", function(data){
   		socket.type = "remote";
   		console.log("Remote ready...");
 	});

 	socket.on("controll", function(data){
   		if(socket.type === "remote"){
     		if(data.action === "tap"){
         		if(ss != undefined){
            		ss.emit("controlling", {action:"enter"});
            	}
		    }
     		else if(data.action === "swipeLeft"){
      			if(ss != undefined){
          			ss.emit("controlling", {action:"goLeft"});
          		}
     		}
     		else if(data.action === "swipeRight"){
       			if(ss != undefined){
           			ss.emit("controlling", {action:"goRight"});
           }
     	}
   	}
	});

  });



//Socket API Namespace
var apps = io.of('/apps')
  .on('connection', function (socket) {
    //TODO: Socket portal for API
  });

/*
io.sockets.on('connection', function (socket) {
  socket.on('set nickname', function (name) {
    socket.set('nickname', name, function () { socket.emit('ready'); });
  });

  socket.on('msg', function (message) {
    socket.get('nickname', function (err, name) {
      console.log(message + ' Chat message by ', name);
    });
  });
});*/