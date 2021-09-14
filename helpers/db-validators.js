const Role = require('../models/role');
const {Usuario, Categoria, Producto} = require('../models');

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

const existeCategoriaPorId = async( id ) =>{
    const existeCategoria = await Categoria.findById(id);
    if( !existeCategoria ){
        throw new Error(`El id: ${ id }, no existe`);
    }
}

const existeProductoPorId = async( id ) =>{
    const existeProducto = await Producto.findById(id);
    if( !existeProducto ){
        throw new Error(`El id: ${ id }, no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}