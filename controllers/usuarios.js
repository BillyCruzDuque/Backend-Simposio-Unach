const bcryptjs = require('bcryptjs');

const { response, request } = require('express');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const filtroQuery = { estado: true };

    const [total, usuarios] = await Promise.all([Usuario.countDocuments(filtroQuery), Usuario.find(filtroQuery)
        .skip(Number(desde))
        .limit(Number(limite))]);

    return res.status(201).json({
        msg: 'Datos de Usuario', total, usuarios,
    });
};
const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, email, ...campos } = req.body;

    if (password) {
        campos.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(11));
    }

    const usuario = await Usuario.findByIdAndUpdate(id, campos, { new: true });

    return res.status(201).json({
        msg: 'Usuario actualizado', usuario,
    });
};
const usuariosPost = async (req, res = response) => {

    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });

    usuario.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(11));
    await usuario.save();

    return res.status(201).json({
        msg: 'Usuario Agregado', usuario,
    });
};
const usuariosDelete = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

    return res.status(201).json({
        msg: 'Usuario Eliminado', usuario,
    });
};

module.exports = {
    usuariosGet, usuariosPut, usuariosPost, usuariosDelete,
};