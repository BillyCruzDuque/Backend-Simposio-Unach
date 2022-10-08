const { Router } = require('express');

const { check } = require('express-validator');

const {
    alumnosGet,
    alumnosGetMatricula,
    alumnosPost,
    alumnosPut
} = require('../controllers/alumnos');

const {
    validarCampos,
} = require('../middlewares/index');

const {
    matriculaExiste,
    esLicenValido, matriculaVerificar
} = require('../helpers/db-validators');



const router = Router();

router.get('/', alumnosGet);

router.get('/:matricula', alumnosGetMatricula);

router.post(
    '/',
    [
        check('matricula', 'La matricula es obligatoria').not().isEmpty(),
        check('matricula').custom(matriculaExiste),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('licenciatura').custom(esLicenValido),
        check('turno', 'El turno es obligatorio').not().isEmpty(),
        check('semestre', 'El semestre es obligatorio').not().isEmpty(),
        check('grupo', 'El grupo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    alumnosPost);

router.put(
    '/:matricula',
    [
        check('matricula', 'La matricula es obligatoria').not().isEmpty(),
        check('matricula').custom(matriculaVerificar),
        validarCampos
    ],
    alumnosPut
);

module.exports = router;