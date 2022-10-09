const express = require('express');
const cors = require('cors');

const alumno = require('../routes/alumnos');
const asistencia = require('../routes/asistencia');
const user = require('../routes/usuarios');
const {dbConnection} = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.alumnosPath = '/api/alumnos';
        this.asistenciaPath = '/api/asistencias';
        this.usuariosPath = '/api/usuarios';

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
        this.app.use(this.alumnosPath, alumno);
        this.app.use(this.asistenciaPath, asistencia);
        this.app.use(this.usuariosPath, user);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor Corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;
