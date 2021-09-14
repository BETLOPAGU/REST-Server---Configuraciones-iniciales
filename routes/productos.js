const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto, 
        eliminarProducto } = require('../controllers/productos');

const { existeCategoriaPorId } = require('../helpers/db-validators');
const { existeProductoPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jws');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

//Obtener todas los productos - publico
router.get('/', obtenerProductos);

//Obtener un producto por id -publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto)

//Crear un producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto );

//Actualizar un producto - privado - cualquiera con un token valido
router.put('/:id', [
    validarJWT,
    //check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], actualizarProducto);

//Borrar una categoría - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],eliminarProducto);

module.exports = router;