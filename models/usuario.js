const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La password es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: {
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            message: 'Debe de coincidir'
        }, trim: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    creacion: {
        type: Date,
        timeZone: 'America/Mexico_City',
        default: Date.now(),

    }
});


// eslint-disable-next-line func-names
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id,...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;

};

module.exports = model('Usuario', UsuarioSchema);