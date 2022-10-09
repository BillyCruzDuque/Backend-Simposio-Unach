const { response, request } = require('express');
const Alumno = require('../models/alumno');

const alumnosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    const [total, alumnos] = await Promise.all([
        Alumno.countDocuments(),
        Alumno.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    return res.status(201).json({
        msg: 'Datos de Alumnos', total, alumnos,
    });
};

const alumnosGetFiltro= async (req = request, res = response) => {
    const {tipo} = req.params;
    const {dato} = req.params;

    const alumno = await Alumno.find({[tipo]: dato});

    return res.status(201).json({
        msg: 'Datos de Filtrados de alumno(s)', alumno,
    });
}

const alumnosPost = async (req, res = response) => {

    const { matricula, nombre, licenciatura, turno, semestre, grupo } = req.body;
    const alumno = new Alumno({ matricula, nombre, licenciatura, turno, semestre, grupo });

    try{
        await alumno.save();
    }catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

    return res.status(201).json({
        msg: 'Alumno Agregado', alumno,
    });
};

const alumnosPut = async (req, res = response) => {

    const { matricula } = req.params;
    const { _id, ...resto } = req.body;

    const alumno = await Alumno.findOneAndUpdate({matricula: matricula}, resto, { new: true });
    return res.status(201).json({
        msg: 'Alumno Actualizado', alumno,
    });
}

module.exports = {
    alumnosGet,
    alumnosGetFiltro,
    alumnosPost,
    alumnosPut
};