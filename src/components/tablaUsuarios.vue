<template>
    <h2>Usuarios</h2>
    <div class="card">
        <div class="card-body">
            <div class="card-title">
                <div class="row">
                    <div class="col-md-6 float-end">
                        <button class="btn btn-sm btn-primary form-control" @click="newUserModal()">Nuevo Usuario</button>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table" id="datatable">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Contraseña</th>
                            <th>Contraseña</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="usuario in usuarios" :key="usuario._id">
                            <td>{{ usuario.usuario }}</td>
                            <td>{{ usuario.password }}</td>
                            <td>
                                <button class="form-control btn btn-primary" >Editar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    


    <Modal
        v-show="isModalVisible"
        @close="closeModal"
    >

    <template v-slot:header>
        Agregar Nuevo Usuario
    </template>

    <template v-slot:body>
        <div class="card">
            <div class="card-body">
                <div class="card-title">
                    <p>Nuevo Usuario</p>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="usuario">Correo Institucional</label>
                            <input type="text" class="form-control" v-model="usuario.usuario">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <input type="password" class="form-control" v-model="usuario.password">
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label for="guardar">Guardar</label>
                        <button class="btn btn-primary form-control" @click="crearUsuario()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        
    </template>

    <template v-slot:footer>
        Modal Crear Usuario
    </template>

    </Modal>

</template>

<script>
    import "jquery/dist/jquery.min.js";
    import "bootstrap/dist/css/bootstrap.min.css";
    import "datatables.net-dt/js/dataTables.dataTables";
    import "datatables.net-dt/css/jquery.dataTables.min.css";
    import axios from "axios";
    import $ from "jquery";
    import Modal from '../components/Modal.vue';

export default {
    data:function(){
        return{
            usuarios:[],
            isModalVisible:false,
            usuario:{}
        }
    },
    mounted(){
        this.obtenerUsuarios()
    },
    components:{
        Modal
    },
    methods:{
        async obtenerUsuarios(){
            await axios.get('http://127.0.0.1:3000/usuarios').then(response=>{
                this.usuarios = response.data;
                $('#datatable').DataTable();
                console.log(response);
            })
            .catch(error=>{
                console.log(error);
            })
        },
        newUserModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        async crearUsuario(){
            await axios.post("http://127.0.0.1:3000/usuarios", this.usuario).then(response=>{
                console.log(response.data);
                this.isModalVisible=false;
                this.obtenerUsuarios();
            })
            .catch(error=>{
                console.log(error);
            })
        }
    },
    watch: {
        usuarios(val) {
            $('#datatable').DataTable().destroy();
            this.$nextTick(()=> {
                $('#datatable').DataTable()
            });
        }
    }  
}
</script>

<style>

</style>