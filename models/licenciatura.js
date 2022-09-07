const {Schema, model} = require('mongoose');

const LicenciaturaSchema = new Schema({

    licenciatura: {
        type: String,
        required: [true, 'La licenciatura es obligatorio'],
    }

});

module.exports = model('Licenciatura', LicenciaturaSchema);