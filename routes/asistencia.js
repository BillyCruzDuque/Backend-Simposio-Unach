const { Router } = require('express');

const { check } = require('express-validator');

const {
    asistenciasGet,
    asistenciaGetMatricula,

    asistenciaPost,

} = require('../controllers/asistencias');

const {
    validarCampos,
} = require('../middlewares/index');

const {
    matriculaVerificar,
    matriculaExisteAsistencia
} = require('../helpers/db-validators');

const router = Router();

router.get('/', asistenciasGet);

router.get('/:matricula', asistenciaGetMatricula);

router.post(
    '/',
    [
        check('matricula', 'La matricula es obligatoria').not().isEmpty(),
        check('matricula').custom(matriculaVerificar),
        check('matricula').custom(matriculaExisteAsistencia),
        validarCampos
    ],
    asistenciaPost);

module.exports = router;