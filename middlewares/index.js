

const validarCampos  = require('../middlewares/validar-campos');
const validarJWT  = require('../middlewares/validar-jws');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivo
}