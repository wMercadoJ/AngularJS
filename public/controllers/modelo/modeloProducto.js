var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = new Schema({
    codigo: {type: String, required: true},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    precio: {type: String, required: true},
    cantidad: {type: Number, required: true}
});

module.exports = mongoose.model('Producto', productoSchema);
