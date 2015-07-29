var productoSchema = require('../modelo/modeloProducto');

// Obtiene todos los objetos Producto de la base de datos
exports.getProductos = function (req, res) {

    productoSchema.find(
        function (err, producto) {
            if (err)
                res.send(err)
            res.json(producto);
        }
    );
};

exports.getProducto = function (req, res) {
    productoSchema.findOne({_id: req.params.id},
        function (err, producto) {
            if (err)
                res.send(err);

            res.json(producto);
        });

};

exports.getProductoByCodigo = function (req, res) {
    productoSchema.findOne({codigo: req.params.codigo},
        function (err, producto) {
            if (err)
                res.send(err);

            res.json(producto);
        });

};

// Guarda un objeto Producto en base de datos
exports.setProducto = function (req, res) {

    // Creo el objeto Producto
    productoSchema.create(
        {
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            cantidad: req.body.cantidad
        },
        function (err, producto) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las Productos tras crear una de ellas
            productoSchema.find(function (err, producto) {
                if (err)
                    res.send(err)
                res.json(producto);
            });
        });

};

// Modificamos un objeto Producto de la base de datos
exports.updateProducto = function (req, res) {
    productoSchema.update({_id: req.params.producto_id},
        {
            $set: {
                codigo: req.body.codigo,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                cantidad: req.body.cantidad
            }
        },
        function (err, producto) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las Productos tras crear una de ellas
            productoSchema.find(function (err, producto) {
                if (err)
                    res.send(err)
                res.json(producto);
            });
        });
};

// Elimino un objeto Producto de la base de Datos
exports.removeProducto = function (req, res) {
    productoSchema.remove({_id: req.params.producto_id},
        function (err, producto) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las Productos tras borrar una de ellas
            productoSchema.find(function (err, producto) {
                if (err)
                    res.send(err)
                res.json(producto);
            });
        });
};