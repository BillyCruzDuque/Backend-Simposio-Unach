const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    matricula: {
        type: String,
        required: [true, 'La matricula es obligatorio'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    licenciatura: {
        type: String,
        required: true,
        emun: {
            values: ['contaduria', 'software'],
            message: 'Debe de coincidir'
        }, trim: true
    },
    turno: {
        type: String,
        required: [true, 'El turno es obligatorio']
    },
    semestre: {
        type: Number,
        required: [true, 'El semestre es obligatorio']
    },
    grupo: {
        type: String,
        required: [true, 'El grupo es obligatorio']
    },
    creacion: {
        type: Date,
        timeZone: 'America/Mexico_City',
        default: Date.now(),
    }
});
AlumnoSchema.methods.toJSON = function() {
    const {__v, _id, creacion,...alumnos } = this.toObject();
    alumnos.uid = _id;
    return alumnos;
}

module.exports = model('Alumno', AlumnoSchema);