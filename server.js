//dependencias de las librerias/modulos
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

//conexion a la base de datos
mongoose.connect("mongodb://localhost:27017/comercial_srvj");

app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});


//GET metodo para ir a la pagina principal

require('./public/controllers/routes.js')(app);
//la applicacion escuchara en el puerto 3000

app.listen(port);
console.log("APP por el puerto " + port);
