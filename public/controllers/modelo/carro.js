/**
 * Created by Luffy on 28/06/2015.
 */

var mongoose = require('mongoose');

module.exports = mongoose.model('Carro', {
    placa: {type: String, required: true},
    modelo: {type: String, required: true},
    chofer: {type: String, required: true},
    estado: {type: Boolean, default: true},
    modificacion_usuario: {type: String, required: true}
});

