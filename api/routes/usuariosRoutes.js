var express = require('express');
const cors = require('cors');

const usuariosController = require('../controllers/usuariosController');

const router = express.Router();
router.use(cors());

router.get('/', usuariosController.obtenerUsuarios);
router.post('/', usuariosController.crearUsuario);

module.exports = router;