const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(role = '') => {
    const existeRol = await Role.findOne({ role });
    if( !existeRol ){
            throw new Error(`El rol ${ role } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ){
        throw new Error(`El correo ${ correo } ya ha sido registrado`);
/*         return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        }); */
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ){
        throw new Error(`El id: ${ id }, no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}