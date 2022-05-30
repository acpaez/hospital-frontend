<template>
  <el-form class="form">
    <el-row :gutter="20">
      <el-col :span="12">
        <h1>Medicos</h1>
        <el-table
          :data="tableData"
          :default-sort="{ prop: 'date', order: 'descending' }"
          style="width: 100%"
        >
          <el-table-column label="Nombre" width="300" prop="date" sortable>
            <template slot-scope="scope">
              <i class="el-icon-s-custom"></i>
              <span style="margin-left: 10px">{{ scope.row.user.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Especialidad" width="110">
            <template slot-scope="scope">
              <el-tag>
                {{ scope.row.especialidad.nombre }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Correo" width="150">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.user.email }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="Operaciones" width="130">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="handleAgendar(scope.row.id)"
                icon="el-icon-check"
                circle
              ></el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </el-col>
      <h1>Crear medicos</h1>
      <el-col :span="6">
        <label>Nombre</label>
        <el-input placeholder="Nombre" v-model="nombre"></el-input>
      </el-col>

      <el-col :span="6">
        <label>Email</label>
        <el-input placeholder="Email" v-model="email"></el-input>
      </el-col>

      <el-col :span="6">
        <label>Password</label>
        <el-input placeholder="Email" v-model="password" show-password>
        </el-input>
      </el-col>
      <br />
      <el-col :span="6">
        <label>Especialidad</label>
        <br />
        <el-select v-model="especialidad" placeholder="Select">
          <el-option
            v-for="item in especialidades"
            :key="item.id"
            :label="item.nombre"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="margin-top: 20px">
        <el-button type="primary" @click="crearMedico">Guardar</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  name: "MedicosForm",
  data() {
    return {
      pageCount: 0,
      total: 0,
      page_size: 0,
      tableData: [],
      especialidades: [],
      especialidad: null,
      nombre: null,
      email: null,
      password: null,
    };
  },
  mounted() {
    this.traerMedicos();
    this.traerEspecialidades();
  },
  methods: {
    traerMedicos() {
      axios.get("medico/traer").then((response) => {
        this.tableData = response.data;
      });
    },

    crearMedico() {
      const data = {
        nombre: this.nombre,
        email: this.email,
        password: this.password,
        especialidad_id: this.especialidad,
      };
      axios.post("medico/crear", data).then((response) => {
        this.$notify.success({
          title: "Success",
          message: response.data.message,
          offset: 100,
        });
        this.traerMedicos();
      });
    },

    traerEspecialidades() {
      axios.get("especialidad/traer").then((response) => {
        this.especialidades = response.data;
      });
    },
  },
};
</script>

<style scoped>
.form {
  margin: 2%;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.margin {
  margin-top: 2%;
}
</style>
