/**
 * Created by  on 18/07/2015.
 */
var carroSchema = require('../modelo/modeloCarro');
var productoSchema = require('../modelo/modeloProducto');


// Obtiene todos los objetos Producto de la base de datos
exports.getCarros = function (req, res){
    carroSchema.find(
        function(err, carro) {
            if (err)
                res.send(err)
            res.json(carro);
        }
    );
};

// Guarda un objeto Producto en base de datos
exports.setCarro = function(req, res) {

    // Creo el objeto Producto
    carroSchema.create(
        {placa : req.body.placa, modelo: req.body.modelo, chofer: req.body.chofer, estado: req.body.estado},
        function(err, carro) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las Carros tras crear una de ellas
            carroSchema.find(function(err, carro) {
                if (err)
                    res.send(err)
                res.json(carro);
            });
        });

};

// Modificamos un objeto Producto de la base de datos
exports.updateCarro = function(req, res){
    carroSchema.update( {_id : req.params.carro_id},
        {$set:{placa : req.body.placa, modelo: req.body.modelo, chofer: req.body.chofer, estado: req.body.estado}},
        function(err, carro) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las Carros tras crear una de ellas
            carroSchema.find(function(err, carro) {
                if (err)
                    res.send(err)
                res.json(carro);
            });
        });
};

// Elimino un objeto Producto de la base de Datos
exports.removeCarro = function(req, res) {
    carroSchema.remove({_id : req.params.carro_id},
        function(err, carro) {
            if (err)
                res.send(err);

        // Obtine y devuelve todas las Carros tras borrar una de ellas
            carroSchema.find(function(err, carro) {
            if (err)
                res.send(err)
            res.json(carro);
        });
    });
};


// Obtiene todos los objetos Producto de la base de datos
exports.getProductos = function (req, res){

    productoSchema.find(
        function(err, producto) {
            if (err)
                res.send(err)
            res.json(producto);
        }
    );
};

// Guarda un objeto Producto en base de datos
exports.setProducto = function(req, res) {

    // Creo el objeto Producto
    productoSchema.create(
        {codigo : req.body.codigo, nombre: req.body.nombre, descripcion: req.body.descripcion, precio: req.body.precio, cantidad: req.body.cantidad},
        function(err, producto) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las Productos tras crear una de ellas
            productoSchema.find(function(err, producto) {
                if (err)
                    res.send(err)
                res.json(producto);
            });
        });

};

// Modificamos un objeto Producto de la base de datos
exports.updateProducto = function(req, res){
    productoSchema.update( {_id : req.params.producto_id},
        {$set:{codigo : req.body.codigo, nombre: req.body.nombre, descripcion: req.body.descripcion, precio: req.body.precio, cantidad: req.body.cantidad}},
        function(err, producto) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las Productos tras crear una de ellas
            productoSchema.find(function(err, producto) {
                if (err)
                    res.send(err)
                res.json(producto);
            });
        });
};

// Elimino un objeto Producto de la base de Datos
exports.removeProducto = function(req, res) {
    productoSchema.remove({_id : req.params.producto_id},
        function(err, producto) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las Productos tras borrar una de ellas
            productoSchema.find(function(err, producto) {
                if (err)
                    res.send(err)
                res.json(producto);
            });
        });
};