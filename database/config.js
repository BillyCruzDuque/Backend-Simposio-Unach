const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CDN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log('Base de Datos Online!!!');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion a la Base de Datos');
    }

};

module.exports = {
    dbConnection
};