
const { Router } = require('express');
const { check } = require('express-validator');


const{ validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser más de seis letras').isLength( {min: 6} ),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExiste ),
        //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( esRolValido ),
        validarCampos
],usuariosPost);

router.put('/:id', [
        check('id', 'No es un ID váido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('role').custom( esRolValido ),
        validarCampos
],usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
        check('id', 'No es un ID váido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosDelete);


module.exports = router;

