<template>
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-md-6">
                    Tabla de Expedientes
                </div>
                <div class="col-md-4 float-end">
                    <button class="btn btn-sm btn-primary form-control" @click="showExpModal()">Nuevo Expediente</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="card-title">
                
            </div>
            <div class="table-responsive">
                <table class="table" id="datatable">
                    <thead>
                        <tr>
                            <th>Folio</th>
                            <th>SO</th>
                            <th>Periodos</th>
                            <th>Procedencia</th>
                            <th>F. Creación</th>
                            <th>F. Actualizado</th>
                            <th>Verificador</th>
                            <th>Estatus</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in expedientes" :key="item._id">
                            <td>{{ item.folio }}</td>
                            <td>{{ item.so }}</td>
                            <td>{{ item.periodos }}</td>
                            <td>{{ item.procedencia }}</td>
                            <td>{{ item.createdAt }}</td>
                            <td>{{ item.updatedAt }}</td>
                            <td>{{ item.usuario }}</td>
                            <td>{{ item.estatus }}</td>
                            <td>
                                <button class="form-control btn btn-secondary ver"  @click="showModal(item._id,item.folio,item.memorias)">Fases</button>
                                <button class="btn btn-primary form-control" @click="showEditModal(item)" style="margin-bottom:7px;">Editar</button>
                                <button class="btn btn-danger form-control" @click="eliminarExp(item._id)">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    

    <!-- Inicio modal para las memorias técnicas -->

    <Modal
      v-show="isModalVisible"
      @close="closeModal"
    >
        <template v-slot:header>
            <div class="row">
                <div class="col-md-8">
                    Fases Registradas del expediente {{ folio }}
                </div>
                <div class="col-md-4">
                    <button class="btn btn-warning form-control" @click="showFaseModal(idExp, folio)">Nueva Fase</button>
                </div>
            </div>
        </template>

        <template v-slot:body>
            <div class = "responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Fase</th>
                            <th>Calificación</th>
                            <th>Enlace Memoria</th>
                            <th>Evidencia</th>
                            <th>Estatus</th>
                            <th>Verificador</th>
                            <th>Fecha de Registro</th>
                            <th>Fecha Actualización</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="mem in memorias" :key="mem._id">
                            <td>{{ mem.fase }}</td>
                            <td>{{ mem.calificacion }}</td>
                            <td>{{ mem.enlace }}</td>
                            <td>{{ mem.evidencia }}</td>
                            <td>{{ mem.estatus }}</td>
                            <td>{{ mem.usuario }}</td>
                            <td>{{ mem.createdAt }}</td>
                            <td>{{ mem.updatedAt }}</td>
                            <td>
                                <button class="btn btn-primary editar" @click="showMemModal(mem)">Editar</button>
                                <button class="btn btn-danger " @click="eliminarFase(mem._id)">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
        
        <template v-slot:footer>
            Información de las Fases Registradas 
        </template>
    </Modal>

    <!-- Fin del modal de tabla de las memorias tecnicas -->
    <!-- *********************************************** -->

     <!-- Inicio Modal para crear nuevo expediente  -->

    <Modal
        v-show="isModalExpVisible"
        @close="closeModal"
    >

        <template v-slot:header>
            Formulario Nuevo Expediente
        </template>

        <template v-slot:body>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="folio">Folio</label>
                        <input type="text" class="form-control" placeholder="folio" title="folio" v-model="expediente.folio">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="so">SO</label>
                        <v-select :options="sos" :reduce="title => title"  label="title" v-model="expediente.so"></v-select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="verificador">Verficador</label>
                        <v-select :options="usuarios" :reduce="usuario => usuario"  label="usuario" v-model="expediente.usuario"></v-select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="periodos">Periodos</label>
                        <input type="text" class="form-control" placeholder="periodos" title="periodos" v-model="expediente.periodos">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="Procedencia">Procedencia</label>
                        <input type="text" class="form-control" placeholder="procedencia" title="procedencia" v-model="expediente.procedencia">
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label for="button">Crear</label>
                        <button class="form-control btn btn-primary" @click="crearExpediente()">Crear</button>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:footer>
            Información de las Fases Registradas 
        </template>

    </Modal>

    <!-- Fin del modal para crear nuevo expediente -->
    <!-- ***************************************** -->

    <!-- Inicio Modal Editar Memoria técnica -->
    <Modal
        v-show="isModalMemVisible"
        @close="closeModal"
    >

        <template v-slot:header>
            Editar Memoria Técnica
        </template>

        <template v-slot:body>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="fase">Fase</label>
                        <input type="text" class="form-control" v-model="memToEdit.fase">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="calificacion">Calificacion</label>
                        <input type="text" class="form-control" v-model="memToEdit.calificacion">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="enlace">Enlace</label>
                        <input type="text" class="form-control" v-model="memToEdit.enlace">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="evidencia">Evidencia</label>
                        <input type="text" class="form-control" v-model="memToEdit.evidencia">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="verificador">Verificador</label>
                        <v-select :options="usuarios" :reduce="usuario => usuario"  label="usuario" v-model="memToEdit.usuario"></v-select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="button">Actualizar</label>
                        <button class="form-control btn btn-primary" @click="actualizarMemoria()">Actualizar</button>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:footer>
            Edición Memoria Técnica
        </template>

    </Modal>
    <!-- Fin del modal para crear nuevo expediente -->


     <!-- Inicio Modal Editar Memoria técnica -->
    <Modal
        v-show="isModalEdVisible"
        @close="closeModal"
    >

        <template v-slot:header>
            Editar Expediente
        </template>

        <template v-slot:body>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="folio">Folio</label>
                        <input type="text" class="form-control" v-model="expEdit.folio">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="so">SO</label>
                        <v-select :options="sos" :reduce="title => title"  label="title" v-model="expEdit.so"></v-select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="periodos">Periodos</label>
                        <input type="text" class="form-control" v-model="expEdit.periodos">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="procedencia">Procedencia</label>
                        <input type="text" class="form-control" v-model="expEdit.procedencia">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="verificador">Verificador</label>
                        <input type="text" class="form-control" v-model="expEdit.usuario">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="estatus">Estatus</label>
                        <input type="text" class="form-control" v-model="expEdit.estatus">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="button">Actualizar</label>
                        <button class="form-control btn btn-primary" @click="actualizarExpediente()">Actualizar</button>
                    </div>
                </div>
                <input type="hidden" v-model="expEdit._id">
            </div>
        </template>

        <template v-slot:footer>
            Editar Expediente
        </template>

    </Modal>

    <!-- Fin del modal para editar expediente -->

    <!-- Modal para registrar fase nueva  -->

    <Modal
        v-show="modalFaseVisible"
        @close=closeModal
        >

        <template v-slot:header>
            Registrar de nueva fase
        </template>

        <template v-slot:body>
            <div class="card">
                <div class="card-header">
                    Registro nueva fase
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="fase">Fase</label>
                                <input type="text" class="form-control" v-model="memoria.fase">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="Calificación">Calificación</label>
                                <input type="text" class="form-control" v-model="memoria.calificacion">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="enlace">Enlace Memoria</label>
                                <input type="text" class="form-control" v-model="memoria.enlace">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="evidencia">Evidencia</label>
                                <input type="text" class="form-control" v-model="memoria.evidencia">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="verificador">Verificador</label>
                                <v-select :options="usuarios" :reduce="usuario => usuario"  label="usuario" v-model="memoria.usuario"></v-select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="estatus">Estatus</label>
                                <input type="text" class="form-control" v-model="memoria.estatus">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="guardar">Guardar</label>
                                <button class="form-control btn btn-primary" @click="crearFase(idExp,folio)">Crear Fase</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:footer>

        </template>

    </Modal>

    <!-- Fin del modal para agregar memoria -->


</template>

<script>
    import "jquery/dist/jquery.min.js";
    import "bootstrap/dist/css/bootstrap.min.css";
    import "datatables.net-dt/js/dataTables.dataTables";
    import "datatables.net-dt/css/jquery.dataTables.min.css";
    import axios from "axios";
    import $ from "jquery";
    import Modal from '../components/Modal.vue';
    import "vue-select/dist/vue-select.css";
    import so from  "../assets/js/sos.json";

    export default {
        mounted() {
            this.obtenerExpedientes(),
            this.obtenerUsuarios()
        },
        data: function () {
            return {
                expedientes: [],
                memorias: [],
                memToEdit:{},
                idExp:'',
                folio:'',
                id:'',
                isModalVisible: false,
                isModalExpVisible: false,
                isModalMemVisible: false,
                isModalEdVisible: false,
                modalFaseVisible:false,
                expEdit:{},
                usuarios:[],
                sos: so,
                expediente:{
                    folio:'',
                    so:'',
                    periodos:'',
                    procedencia:'',
                    usuario:'',
                    estatus:'Abierto',
                    memorias:{
                        fase:1,
                        calificacion:0,
                        enlace:'',
                        evidencia:'',
                        estatus:'',
                        fechaRecibo:''
                    }
                },
                memoria:{
                    fase:'',
                    calificacion:0,
                    enlace:'',
                    evidencia:'',
                    estatus:'',
                    usuario:''
                }
            };
        },
        components:{
            Modal
        },
        methods:{
            async obtenerExpedientes(){
                await axios.get(import.meta.env.VITE_BaseUrl+'expediente').then(response=>{
                    this.expedientes = response.data;
                    $("#datatable").DataTable();
                }).catch(error=>{
                    this.expedientes = []
                })
            },
            showModal(id,folio,memorias) {
                this.isModalVisible = true;
                this.memorias = memorias;
                this.folio = folio;
                this.idExp = id;
            },
            closeModal() {
                this.isModalVisible = false;
                this.isModalExpVisible = false;
                this.isModalMemVisible = false;
                this.isModalEdVisible = false;
                this.modalFaseVisible = false;
            },
            showExpModal(){
                this.isModalExpVisible = true;
            },
            async crearExpediente(){
                this.expediente.so = this.expediente.so.title;
                this.expediente.usuario = this.expediente.usuario.usuario;
                await axios.post(import.meta.env.VITE_BaseUrl+'expediente', this.expediente).then(response=>{
                    this.isModalExpVisible = false;
                    this.obtenerExpedientes();
                }).catch(error=>{
                    console.log(error);
                })
            },
            showMemModal(memoria){
                this.memToEdit = memoria;
                this.memToEdit.estatus = "empezado";
                this.isModalMemVisible = true;
            },
            async actualizarMemoria(){
                this.memToEdit.usuario = this.memToEdit.usuario.usuario;
                await axios.put(import.meta.env.VITE_BaseUrl+'expediente/actualizar/memoria/'+this.idExp, this.memToEdit).then(response=>{
                    this.memToEdit = {};
                    this.isModalMemVisible = false
                }).catch(error=>{
                    console.log(error);
                })
            },
            showEditModal(item){
                this.expEdit = item;
                this.isModalEdVisible = true;
            },
            async actualizarExpediente(){
                this.expEdit.so = this.expEdit.so.title;
                await axios.put(import.meta.env.VITE_BaseUrl+"expediente/actualizar/"+this.expEdit._id, this.expEdit).then(response=>{
                    this.expEdit = {};
                    this.isModalEdVisible = false;
                }).catch(error=>{
                    console.log(error);
                })
            },
            async obtenerUsuarios(){
                await axios.get(import.meta.env.VITE_BaseUrl+'usuarios').then(response=>{
                    this.usuarios = response.data;
                })
                .catch(error=>{
                    console.log(error);
                })
            },
            showFaseModal(id, folio){
                this.modalFaseVisible=true;
                this.idExp = id;
                this.folio = folio;
            },
            async crearFase(idExp, folio){
                this.memoria.usuario = this.memoria.usuario.usuario;
                this.memoria.folio = this.folio
                console.log(this.memoria);
                await axios.put(import.meta.env.VITE_BaseUrl+'expediente/crear/memoria/'+idExp, this.memoria).then(response => {
                    this.modalFaseVisible = false;
                    this.obtenerExpedientes();
                })
                .catch(error=>{
                    console.log(error);
                })
            },
            async eliminarFase(id){
                this.memToEdit.id = id;
                await axios.put(import.meta.env.VITE_BaseUrl+'expediente/eliminar/memoria/'+this.idExp, this.memToEdit).then(response => {
                    this.isModalVisible = false;
                    this.obtenerExpedientes();
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            async eliminarExp(id){
                await axios.delete(import.meta.env.VITE_BaseUrl+'expediente/eliminar/expediente/'+id).then(response => {
                    this.obtenerExpedientes();
                })
            }
        },
        watch: {
            expedientes(val) {
                $('#datatable').DataTable().destroy();
                this.$nextTick(()=> {
                    $('#datatable').DataTable()
                });
            }
        }  
    };
</script>

<style>
  .ver {
    margin-bottom: 10px;
  }
  .editar{
    margin-right:5px;
  }
</style>