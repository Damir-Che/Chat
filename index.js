var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);//отслеживает server

// какой порт будет прослеживать сервер
server.listen(3000);

// отслеживаем адрес(request-запрос, respons-ответ)
app.get('/', function(request, respons){
	respons.sendFile(__dirname + '/index.html');
});

//
users = [];//масив где хронят пользователи 
connectionsss = [];//все подкл пользователей

//мы заходим на сайт и выдается событие 'connections' по кторой выпол функция
io.sockets.on('connection',function(socket){
	console.log('Успешное соединение');
	connectionsss.push(socket);//добов в массив socket

	// удаление обьекта offline
	socket.on('disconnect', function(data){
		connectionsss.splice(connectionsss.indexOf(socket),1);
		console.log('Отключились');
	});
	// 
	//data-текстовое значение смс val()
	socket.on('send mess', function(data){
		io.sockets.emit('add mess', {mess: data.mess, name: data.name});
	});
});
		