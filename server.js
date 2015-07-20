//dependencias de las librerias/modulos
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');

var app = express();

var port = process.env.PORT || 3000;

//conexion a la base de datos
mongoose.connect("mongodb://localhost:27017/comercial_srvj");


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//GET metodo para ir a la pagina principal
require('./public/controllers/routes.js')(app);

//la applicacion escuchara en el puerto 3000

app.listen(port);
console.log("APP por el puerto " + port);
