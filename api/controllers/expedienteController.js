const Expediente = require('../models/expedientes');
const sgMail = require('@sendgrid/mail')
require('dotenv').config();


const obtenerExpedientes = (req,res) => {
    Expediente.find().sort({createdAt: -1})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.send(err);
    });
}

const crearExpediente = (req,res) => {
    const expediente = new Expediente(req.body);
    const msg = "Se ha credo un nuevo expediente para ti con folio:" + req.body.folio;
    const asunto = "Nueva denuncia creada";
    expediente.save()
    .then((result)=>{
        enviarCorreo(req.body.usuario,msg,asunto);
        console.log(res.json(result));
    })
    .catch((err)=>{
        console.log(err);
    })
}

const eliminarExpediente = (req,res)=>{
    const qry = { _id: req.params.id };
    Expediente.deleteOne(qry)
        .then((result)=>{
            console.log(res.json(result));
        })
        .catch((err)=>{
            console.log(err);
        })
}

const obtenerMemorias = (req,res) => {
    Expediente.findById({_id: req.params.id }).select({memorias:1, _id:0})
    .then((result)=>{
        console.log(res.json(result));
    })
    .catch((err)=>{
        console.log(err);
    })
}

const crearMemoria = (req,res) => {
    console.log(req.body);
    Expediente.findOneAndUpdate({_id:req.params.id},{
        $push:{
             memorias:req.body
        }
    })
    .then((result)=>{
        const msg = "Se ha creado solicitud para realizar nueva memoria técnica en fase " +req.body.fase+" del folio: "+req.body.folio;
        const asunto = "Nueva memoria técnica creada";
        enviarCorreo(req.body.usuario,msg,asunto);
        console.log(res.json(result.folio));
    })
    .catch((err)=>{
        res.send(err)
    })
}

const actualizarMemoria = (req,res) => {
    Expediente.findOneAndUpdate({_id:req.params.id, 'memorias._id': req.body._id},{
        $set:{
            'memorias.$.fase':req.body.fase,
            'memorias.$.calificacion':req.body.calificacion,
            'memorias.$.enlace':req.body.enlace,
            'memorias.$.evidencia':req.body.evidencia,
            'memorias.$.estatus':req.body.estatus,
            'memorias.$.usuario':req.body.usuario,
        }
    })
    .then((result)=>{
        console.log(res.json(result));
    })
    .catch((err)=>{
        res.send(err);
    })
}

const actualizarExpediente = (req,res) => {
    Expediente.findOneAndUpdate({_id:req.params.id},{
        $set:{
            'folio': req.body.folio,
            'usuario': req.body.usuario,
            'so': req.body.so,
            'procedencia': req.body.procedencia,
            'periodos': req.body.periodos,
            'estatus': req.body.estatus
        }
    }).exec()
    .then((result)=>{
        console.log(res.json(result));
    })
    .catch((err)=>{
        res.send(err);
    })
}

const eliminarMemoria = (req,res) => {
    Expediente.findOneAndUpdate({_id: req.params.id},
        {
           $pull:{
                memorias:{
                    _id:req.body.id
                }
           }     
        })
        .then((result)=>{
            console.log(res.json(result));
        })
        .catch((err)=>{
            res.send(err);
        })
}

const enviarCorreo = (usuario,body,asunto) => {
    console.log(usuario);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: usuario,
        from: 'e.hernandez@izai.org.mx',
        subject: asunto,
        text: 'Se ha registrado movimiento en sitema de denucias',
        html: '<strong>'+body+'</strong>'
    }
    sgMail
        .send(msg)
        .then(()=>{
            return "si se envio";
        })
        .catch((error)=>{
            console.log(error);
        })
}

module.exports = {
    obtenerExpedientes,
    crearExpediente,
    obtenerMemorias,
    actualizarMemoria,
    actualizarExpediente,
    crearMemoria,
    eliminarMemoria,
    enviarCorreo,
    eliminarExpediente
}