const { Router } = require('express');

const { check } = require('express-validator');
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
   } = require('../controllers/usuarios');

const {
    validarCampos,
} = require('../middlewares/index');

const {
    esRoleValido,
    emailExiste,
    existeUsuarioId,
} = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);

router.put(
    '/:id',
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioId),
        check('rol').custom(esRoleValido),
        validarCampos,
    ],
    usuariosPut);

router.post(
    '/',
    [
        check('email', 'El correo no es valido').isEmail(),
        check('email').custom(emailExiste),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y mas de 6 caracteres').isLength({ min: 6 }), // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(esRoleValido), validarCampos,
    ],
    usuariosPost);

router.delete(
    '/:id',
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioId),
        validarCampos,
    ],
    usuariosDelete);


module.exports = router;