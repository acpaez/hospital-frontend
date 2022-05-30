<template>
  <el-form class="form">
    <el-row>
      <el-col :span="12">
        <h1>Citas Disponibles</h1>
        <el-table
          :data="tableData"
          :default-sort="{ prop: 'date', order: 'descending' }"
          style="width: 100%"
        >
          <el-table-column label="Fecha" width="150" prop="date" sortable>
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.fecha }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Horario" width="130">
            <template slot-scope="scope">
              <el-tag>
                {{ scope.row.hora_inicio }} - {{ scope.row.hora_fin }}
              </el-tag>
            </template>
          </el-table-column>
          <div v-if="paciente">
            <el-table-column label="Medico" width="210">
              <template slot-scope="scope">
                <span>{{ scope.row.medico.user.name }}</span>
              </template>
            </el-table-column>
          </div>

          <el-table-column v-if="paciente" label="Operaciones" width="130">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="handleAgendar(scope.row.id)"
                icon="el-icon-check"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :page-size="page_size"
            :pageCount="pageCount"
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="12">
        <h1>Mis Citas Agendadas</h1>
        <el-table
          :data="tableDataMisCitas"
          :default-sort="{ prop: 'date', order: 'descending' }"
          style="width: 100%"
        >
          <el-table-column label="Fecha" width="130" prop="date" sortable>
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.fecha }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Horario" width="130">
            <template slot-scope="scope">
              <el-tag>
                {{ scope.row.hora_inicio }} - {{ scope.row.hora_fin }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="paciente" label="Medico" width="210">
            <template slot-scope="scope">
              <span>{{ scope.row.medico.user.name }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="medico" label="Paciente" width="210">
            <template slot-scope="scope">
              <span>{{ scope.row.paciente.user.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Operaciones">
            <template slot-scope="scope">
              <el-button
                type="danger"
                @click="handleDelete(scope.row.id)"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :page-size="page_size_mis_citas"
            :pageCount="pageCountMiCitas"
            layout="prev, pager, next"
            :total="total_miscitas"
            @current-change="handleCurrentChangeMisCitas"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  name: "CitasForm",
  data() {
    return {
      pageCount: 0,
      total: 0,
      page_size: 0,
      tableData: [],
      tableDataMisCitas: [],
      pageCountMiCitas: 0,
      total_miscitas: 0,
      page_size_mis_citas: 0,
      paciente: false,
      medico: false,
      user_local: null,
    };
  },
  mounted() {
    this.user_local = JSON.parse(localStorage.getItem("user"));
    this.medico = this.user_local.user.medico == null ? false : true;
    this.paciente = this.user_local.user.paciente == null ? false : true;
    this.cargarCitas();
    this.cargarMisCitas();
  },
  methods: {
    cargarCitas() {
      if (this.paciente) {
        axios.get("citas/traer-disponibles").then((response) => {
          this.tableData = response.data.data;
          this.total = response.data.total;
          this.page_size = response.data.per_page;
          this.pageCount = response.data.to;
        });
      } else if (this.medico) {
        axios
          .get(
            "citas/traer-disponibles-medico/" + this.user_local.user.medico.id
          )
          .then((response) => {
            this.tableData = response.data.data;
            this.total = response.data.total;
            this.page_size = response.data.per_page;
            this.pageCount = response.data.to;
          });
      }
    },
    cargarMisCitas() {
      if (this.paciente) {
        axios
          .get(`citas/mis-citas/` + this.user_local.user.paciente.id)
          .then((response) => {
            this.tableDataMisCitas = response.data.data;
            this.total_miscitas = response.data.total;
            this.page_size_mis_citas = response.data.per_page;
            this.pageCountMiCitas = response.data.to;
          });
      } else if (this.medico) {
        axios
          .get(`citas/mis-citas-medico/` + this.user_local.user.medico.id)
          .then((response) => {
            this.tableDataMisCitas = response.data.data;
            this.total_miscitas = response.data.total;
            this.page_size_mis_citas = response.data.per_page;
            this.pageCountMiCitas = response.data.to;
          });
      }
    },
    handleAgendar(cita_id) {
      const data = {
        paciente_id: 1,
      };
      axios.put(`citas/agendar/` + cita_id, data).then((response) => {
        this.$notify.success({
          title: "Success",
          message: response.data.message,
          offset: 100,
        });
        this.cargarCitas();
        this.cargarMisCitas();
      });
    },
    handleDelete(cita_id) {
      const data = {
        paciente_id: 1,
      };
      axios.put(`citas/cancelar/` + cita_id, data).then((response) => {
        this.$notify.success({
          title: "Success",
          message: response.data.message,
          offset: 100,
        });
        this.cargarCitas();
        this.cargarMisCitas();
      });
    },

    handleCurrentChange(val) {
      if (this.paciente) {
        axios.get(`citas/traer-disponibles?page=` + val).then((response) => {
          this.tableData = response.data.data;
        });
      } else if (this.medico) {
        axios
          .get(
            "citas/traer-disponibles-medico/" +
              this.user_local.user.medico.id +
              "?page=" +
              val
          )
          .then((response) => {
            this.tableData = response.data.data;
          });
      }
    },

    handleCurrentChangeMisCitas(val) {
      if (this.paciente) {
        axios
          .get(
            "citas/mis-citas/" +
              this.user_local.user.paciente.id +
              "?page=" +
              val
          )
          .then((response) => {
            this.tableDataMisCitas = response.data.data;
          });
      } else if (this.medico) {
        axios
          .get(
            `citas/mis-citas-medico/` +
              this.user_local.user.medico.id +
              "?page=" +
              val
          )
          .then((response) => {
            this.tableDataMisCitas = response.data.data;
          });
      }
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
