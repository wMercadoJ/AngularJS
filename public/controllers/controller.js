var Carro = require('./modelo/carro');


// Obtiene todos los objetos Persona de la base de datos
exports.getCarro = function (req, res){
	Carro.find(
		function(err, carro) {
			if (err)
				res.send(err)
					res.json(carro); // devuelve todas las Carros en JSON
				}
			);
}

// Guarda un objeto Persona en base de datos
exports.setCarro = function(req, res) {
		// Creo el objeto Persona
	Carro.create(
			{placa : req.body.placa,modelo: req.body.modelo, chofer: req.body.chofer, estado: req.body.estado, modificacion_usuario: req.body.modificacion_usuario},
			function(err, carro) {
				if (err)
					res.send(err);

				// Obtine y devuelve todas las personas tras crear una de ellas
				Carro.find(function(err, carro) {
				 	if (err)
				 		res.send(err)
				 	res.json(carro);
				});
			});

	}

// Modificamos un objeto Persona de la base de datos
exports.updateCarro = function(req, res){
	Carro.update( {_id : req.params.carro_id},
					{$set:{placa : req.body.placa,	modelo: req.body.modelo, chofer: req.body.chofer, estado: req.body.estado, modificacion_usuario: req.body.modificacion_usuario}},
					function(err, carro) {
						if (err)
							res.send(err);

				// Obtine y devuelve todas las personas tras crear una de ellas
						Carro.find(function(err, carro) {
				 	if (err)
				 		res.send(err)
				 	res.json(carro);
				});
			});
	}

// Elimino un objeto Persona de la base de Datos
exports.removeCarro = function(req, res) {
	Carro.remove({_id : req.params.carro_id}, function(err, carro) {
		if (err)
			res.send(err);

			// Obtine y devuelve todas las personas tras borrar una de ellas
		Carro.find(function(err, carro) {
				if (err)
					res.send(err)
				res.json(carro);
			});
		});
}
