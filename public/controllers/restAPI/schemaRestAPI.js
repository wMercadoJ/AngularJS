/**
 * Created by  on 18/07/2015.
 */
var carroSchema = require('../modelo/modeloCarro');



// Obtiene todos los objetos Producto de la base de datos
exports.getCarros = function (req, res) {
    carroSchema.find(
        function (err, carro) {
            if (err)
                res.send(err)
            res.json(carro);
        }
    );
};

exports.getCarro = function (req, res) {
    carroSchema.findOne({_id: req.params.id},
        function (err, carro) {
            if (err)
                res.send(err);

            res.json(carro);
    });

};

// Guarda un objeto Producto en base de datos
exports.setCarro = function (req, res) {

    // Creo el objeto Producto
    carroSchema.create(
        {placa: req.body.placa, modelo: req.body.modelo, chofer: req.body.chofer, estado: req.body.estado},
        function (err, carro) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las Carros tras crear una de ellas
            carroSchema.find(function (err, carro) {
                if (err)
                    res.send(err)
                res.json(carro);
            });
        });

};

// Modificamos un objeto Producto de la base de datos
exports.updateCarro = function (req, res) {
    carroSchema.update({_id: req.params.carro_id},
        {$set: {placa: req.body.placa, modelo: req.body.modelo, chofer: req.body.chofer, estado: req.body.estado}},
        function (err, carro) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las Carros tras crear una de ellas
            carroSchema.find(function (err, carro) {
                if (err)
                    res.send(err)
                res.json(carro);
            });
        });
};

// Elimino un objeto Producto de la base de Datos
exports.removeCarro = function (req, res) {
    carroSchema.remove({_id: req.params.carro_id},
        function (err, carro) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las Carros tras borrar una de ellas
            carroSchema.find(function (err, carro) {
                if (err)
                    res.send(err)
                res.json(carro);
            });
        });
};

