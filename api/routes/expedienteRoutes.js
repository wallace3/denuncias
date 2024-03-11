var express = require('express');
const cors = require('cors');

const expedienteController = require('../controllers/expedienteController');

const router = express.Router();
router.use(cors());

router.get('/', expedienteController.obtenerExpedientes);
router.post('/', expedienteController.crearExpediente);
router.get('/memorias/:id', expedienteController.obtenerMemorias);
router.put('/actualizar/memoria/:id', expedienteController.actualizarMemoria);
router.put('/actualizar/:id', expedienteController.actualizarExpediente);
router.put('/crear/memoria/:id', expedienteController.crearMemoria);
router.put('/eliminar/memoria/:id', expedienteController.eliminarMemoria);
router.delete('/eliminar/expediente/:id', expedienteController.eliminarExpediente);

module.exports = router;