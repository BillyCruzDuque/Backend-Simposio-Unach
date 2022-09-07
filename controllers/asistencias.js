const { response, request } = require('express');
const Asistencia = require('../models/asistencia');
const moment = require('node-moment');


const asistenciasGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    const [total, alumnos] = await Promise.all([
        Asistencia.countDocuments(),
        Asistencia.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    return res.status(201).json({
        msg: 'Datos de Alumnos', total, alumnos,
    });
};

const asistenciaGetMatricula = async (req = request, res = response) => {
    const { matricula } = req.params;
    const alumno = await Asistencia.findOne({ matricula });
    return res.status(201).json({
        msg: 'Datos de Alumno', alumno,
    });
}

const asistenciaPost = async (req, res = response) => {

    const { matricula, fecha, entrada} = req.body;


    const asistencia = new Asistencia({ matricula, fecha, entrada });

    try{
        await asistencia.save();
    }catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

    return res.status(201).json({
        msg: 'Alumno Agregado', asistencia,
    });
};

module.exports = {
    asistenciasGet,
    asistenciaGetMatricula,
    asistenciaPost
};