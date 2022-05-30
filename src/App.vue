<template>
  <div>
    <div v-show="this.$store.state.auth.status.loggedIn">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand v-show="!paciente" :to="{ name: 'home' }"
          >Crear Horario</b-navbar-brand
        >
        <b-navbar-brand :to="{ name: 'citas' }"
          >Citas</b-navbar-brand
        >
        <b-navbar-brand v-show="!medico && !paciente" :to="{ name: 'medicos' }"
          >Crear medicos</b-navbar-brand
        >
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item @click.prevent="logOut">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      medico: false,
      paciente: false,
    };
  },
  mounted() {
    let user_local = JSON.parse(localStorage.getItem("user"));
    this.medico = user_local.user.medico == null ? false : true;
    this.paciente = user_local.user.paciente == null ? false : true;
  },
  methods: {
    /**
     * @method logOut
     *
     */
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
