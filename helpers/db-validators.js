const Alumno = require('../models/alumno');
const Licenciatura = require('../models/licenciatura');
const Asistencia = require('../models/asistencia');

const matriculaExiste = async (matricula = '') => {
    const existeMatricula = await Alumno.findOne({ matricula });

    if (existeMatricula) {
        throw new Error(`Matricula ya registrada: ${matricula}`);
    }
};

const matriculaVerificar = async (matricula = '') => {
    const existeMatricula = await Alumno.findOne({ matricula });

    if (!existeMatricula) {
        throw new Error(`Matricula No registrada: ${matricula}`);
    }
};

const matriculaExisteAsistencia = async (matricula = '') => {
    const existeMatricula = await Asistencia.findOne({ matricula });

    if (existeMatricula) {
        throw new Error(`Matricula ya registrada en la asistencia: ${matricula}`);
    }
};

const esLicenValido = async (licenciatura = '') => {
    const existeLic = await Licenciatura.findOne({ licenciatura });
    if (!existeLic) {
        throw new Error(`No existe la licenciatura: ${licenciatura}`);
    }
};


const existeAlumnoId  = async (id = '') => {
    const existeUsuario = await Alumno.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id no existe: ${id}`);
    }
};

module.exports = {

    matriculaExiste,
    esLicenValido,
    matriculaVerificar,
    existeAlumnoId,
    matriculaExisteAsistencia
};