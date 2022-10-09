const Alumno = require('../models/alumno');
const Licenciatura = require('../models/licenciatura');
const Asistencia = require('../models/asistencia');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

// Verifica si la matricula existe en la base de datos
const matriculaExiste = async (matricula = '') => {
    const existeMatricula = await Alumno.findOne({ matricula });

    if (existeMatricula) {
        throw new Error(`Matricula ya registrada: ${matricula}`);
    }
};

// Busca la matricula en la base de datos para que al hacer la asistencia solo se acepten matriculas registradas
const matriculaVerificar = async (matricula = '') => {
    const existeMatricula = await Alumno.findOne({ matricula });

    if (!existeMatricula) {
        throw new Error(`Matricula No registrada: ${matricula}`);
    }
};

// Verifica si la asistencia de una matricula si existe en la base de datos
const matriculaExisteAsistencia = async (matricula = '') => {
    const existeMatricula = await Asistencia.findOne({ matricula });

    if (existeMatricula) {
        throw new Error(`Matricula ya registrada en la asistencia: ${matricula}`);
    }
};

// Verifica si la licenciatura existe en la base de datos
const esLicenValido = async (licenciatura = '') => {
    const existeLic = await Licenciatura.findOne({ licenciatura });
    if (!existeLic) {
        throw new Error(`No existe la licenciatura: ${licenciatura}`);
    }
};

// Verifica si el usuario existe en la base de datos
const existeAlumnoId  = async (id = '') => {
    const existeUsuario = await Alumno.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id no existe: ${id}`);
    }
};

// Verificacion de roles en la base de datos
const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`No existe el rol: ${rol}`);
    }
};

// Verifica si el usuario(Email) existe en la base de datos
const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
        throw new Error(`Email ya registrado: ${email}`);
    }
};

// Verifica si el usuario(ID) existe en la base de datos
const existeUsuarioId  = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id no existe: ${id}`);
    }
};

module.exports = {

    matriculaExiste,
    esLicenValido,
    matriculaVerificar,
    existeAlumnoId,
    matriculaExisteAsistencia,
    esRoleValido,
    emailExiste,
    existeUsuarioId
};