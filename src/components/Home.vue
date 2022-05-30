<template>
  <el-form class="form">
    <el-row>
      <el-col :span="6"
        ><div class="grid-content">
          <label for="dias">Selecciona dias a trabajar</label>
          <el-select id="dias" v-model="dias" multiple placeholder="Select">
            <el-option
              v-for="item in listado_dias"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select></div
      ></el-col>
    </el-row>
    <el-row :gutter="20" v-show="dias.length > 0">
      <div v-for="(item, index) in dias" :key="item" class="margin">
        <el-col :span="8">
          <div class="grid-content">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ item }}</span>
              </div>
              <div>
                <label>Hora inicio</label>
                <br />
                <el-time-select
                  placeholder="Hora inicio"
                  v-model="hora_inicio[index]"
                  :picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '23:30',
                  }"
                >
                </el-time-select>
                <br />
                <label>Hora fin</label>
                <br />
                <el-time-select
                  placeholder="Hora fin"
                  value-format="HH:mm"
                  v-model="hora_fin[index]"
                  :picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '23:30',
                    minTime: hora_inicio[index],
                  }"
                >
                </el-time-select>
              </div>
            </el-card>
          </div>
        </el-col>
      </div>
    </el-row>
    <br />
    <el-button type="primary" icon="el-icon-check" @click="guardarHorario()"
      >Guardar</el-button
    >
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeForm",
  data() {
    return {
      hora_inicio: [],
      hora_fin: [],
      dias: [],
      listado_dias: [
        {
          id: "Lunes",
          name: "Lunes",
        },
        {
          id: "Martes",
          name: "Martes",
        },
        {
          id: "Miercoles",
          name: "Miercoles",
        },
        {
          id: "Jueves",
          name: "Jueves",
        },
        {
          id: "Viernes",
          name: "Viernes",
        },
        {
          id: "Sabado",
          name: "Sabado",
        },
        {
          id: "Domingo",
          name: "Domingo",
        },
      ],
    };
  },
  methods: {
    guardarHorario() {
      let user_local = JSON.parse(localStorage.getItem("user"));
      const data_horario = {
        dias: this.dias,
        hora_inicio: this.hora_inicio,
        hora_fin: this.hora_fin,
        medico_id: user_local.user.medico.id,
      };
      axios.post("horario/create", data_horario).then((response) => {
        this.$notify.success({
          title: "Success",
          message: response.data.message,
          offset: 100,
        });
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
