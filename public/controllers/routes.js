var Carro = require('./modelo/carro');
var Controller = require ('./controller');

module.exports = function(app) {

	// devolver todos los Personas
	app.get('/api/carro', Controller.getCarro);
	// Crear una nueva Persona
	app.post('/api/carro', Controller.setCarro);
	// Modificar los datos de una Persona
	app.put('/api/carro/:carro_id', Controller.updateCarro);
	// Borrar una Persona
	app.delete('/api/carro/:carro_id', Controller.removeCarro);

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // Carga única de la vista
	});
};