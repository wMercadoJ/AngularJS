var Persona = require('./modelo/modeloCarro');


// Obtiene todos los objetos Producto de la base de datos
exports.getPersona = function (req, res) {
    Persona.find(
        function (err, persona) {
            if (err)
                res.send(err)
            res.json(persona); // devuelve todas las Personas en JSON
        }
    );
}

// Guarda un objeto Producto en base de datos
exports.setPersona = function (req, res) {

    // Creo el objeto Producto
    Persona.create(
        {nombre: req.body.nombre, apellido: req.body.apellido, edad: req.body.edad},
        function (err, persona) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las personas tras crear una de ellas
            Persona.find(function (err, persona) {
                if (err)
                    res.send(err)
                res.json(persona);
            });
        });

}

// Modificamos un objeto Producto de la base de datos
exports.updatePersona = function (req, res) {
    Persona.update({_id: req.params.persona_id},
        {$set: {nombre: req.body.nombre, apellido: req.body.apellido, edad: req.body.edad}},
        function (err, persona) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las personas tras crear una de ellas
            Persona.find(function (err, persona) {
                if (err)
                    res.send(err)
                res.json(persona);
            });
        });
}

// Elimino un objeto Producto de la base de Datos
exports.removePersona = function (req, res) {
    Persona.remove({_id: req.params.persona_id}, function (err, persona) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las personas tras borrar una de ellas
        Persona.find(function (err, persona) {
            if (err)
                res.send(err)
            res.json(persona);
        });
    });
}