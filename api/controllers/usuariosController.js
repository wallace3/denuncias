const Usuarios = require('../models/usuarios');

const crearUsuario = (req,res) => {
    const usuario = new Usuarios(req.body);
    usuario.save()
    .then((result)=>{
        console.log(res.json(result));
    })
    .catch((err)=>{
        console.log(err);
    })
}

const obtenerUsuarios = (req,res) => {
    Usuarios.find().sort({createdAt: -1})
    .then((result)=>{
        console.log(res.json(result));
    })
    .catch((err)=>{
        res.send(err);
    })
}

module.exports = {
    crearUsuario,
    obtenerUsuarios
}
