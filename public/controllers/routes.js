var Carro = require('./modelo/modeloCarro');
var Producto = require('./modelo/modeloProducto');
var schemaRestAPI = require ('./restAPI/schemaRestAPI');
var productoRestAPI = require ('./restAPI/productoRestAPI');

module.exports = function(restApi) {

    // devolver todos los Carros
    restApi.get('/api/carro', schemaRestAPI.getCarros);
    // devolver a un Carro
    restApi.get('/api/carro/:id', schemaRestAPI.getCarro);
    // Crear una nueva Carro
    restApi.post('/api/carro', schemaRestAPI.setCarro);
    // Modificar los datos de una Carro
    restApi.put('/api/carro/:carro_id', schemaRestAPI.updateCarro);
    // Borrar una Carro
    restApi.delete('/api/carro/:carro_id', schemaRestAPI.removeCarro);


    // devolver todos los Productos
    restApi.get('/api/producto', productoRestAPI.getProductos);
    // devolver a un Producto
    restApi.get('/api/producto/:id', productoRestAPI.getProducto);
    // devolver a un Producto
    restApi.get('/api/productoCod/:codigo', productoRestAPI.getProductoByCodigo);
    // Crear una nueva Producto
    restApi.post('/api/producto', productoRestAPI.setProducto);
    // Modificar los datos de una Producto
    restApi.put('/api/producto/:producto_id', productoRestAPI.updateProducto);
    // Borrar una Producto
    restApi.delete('/api/producto/:producto_id', productoRestAPI.removeProducto);

}; 