const express = require('express');
const cors = require('cors');

const alumno = require('../routes/alumnos');
const asistencia = require('../routes/asistencia');
const {dbConnection} = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/alumnos';
        this.asistenciaPath = '/api/asistencias';
        // Connect to database
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes of my application
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Lectura y parseo del Body
        this.app.use(express.json());


    }

    routes() {
        this.app.use(this.usuariosPath, alumno);
        this.app.use(this.asistenciaPath, asistencia);

    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor Corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;
