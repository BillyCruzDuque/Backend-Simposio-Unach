const { Schema, model } = require('mongoose');

const AsistenciaSchema = Schema({
    matricula: {
        type: String,
        required: [true, 'La matricula es obligatorio'],
        unique: true
    },
    fecha: {
        type: Date,
    },
    entrada:{
        type: String,
    },
    salida:{
        type: String,
    }

});

module.exports = model('Asistencia', AsistenciaSchema);