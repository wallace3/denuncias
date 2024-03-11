const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memoriasSchema = new Schema({
    fase:String,
    calificacion:Number,
    enlace: String,
    evidencia:String,
    estatus:String,
    usuario:String,
    fechaRecibo:String,
    fechaEntrega:String
},{ timestamps: true })

const expedienteSchema = new Schema({
    folio:{
        type:String,
        required: true
    },
    usuario:{
        type:String,
        required: true
    },
    so:{
        type:String,
        required: true
    },
    procedencia:{
        type:String,
        required:true
    },
    periodos:{
        type:String
    },
    memorias:[memoriasSchema],
    estatus:{
        type:String
    }
},{ timestamps: true });

const Expediente = mongoose.model('Expediente', expedienteSchema);
module.exports = Expediente;