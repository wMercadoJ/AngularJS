var Carro = require('./modelo/modeloCarro');
var Producto = require('./modelo/modeloProducto');
var CarroApi = require ('./restAPI/schemaRestAPI');

module.exports = function(restApi) {

    // devolver todos los Carros
    restApi.get('/api/carro', CarroApi.getCarros);
    // Crear una nueva Carro
    restApi.post('/api/carro', CarroApi.setCarro);
    // Modificar los datos de una Carro
    restApi.put('/api/carro/:carro_id', CarroApi.updateCarro);
    // Borrar una Carro
    restApi.delete('/api/carro/:carro_id', CarroApi.removeCarro);


    // devolver todos los Productos
    restApi.get('/api/producto', CarroApi.getProductos);
    // Crear una nueva Producto
    restApi.post('/api/producto', CarroApi.setProducto);
    // Modificar los datos de una Producto
    restApi.put('/api/producto/:producto_id', CarroApi.updateProducto);
    // Borrar una Producto
    restApi.delete('/api/producto/:producto_id', CarroApi.removeProducto);

}; 