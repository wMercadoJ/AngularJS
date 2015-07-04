var mongoose = require('mongoose');

module.exports = mongoose.model('Carro', {
	nombre: String,
	apellido: String,
	edad: String
});