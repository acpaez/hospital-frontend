import VueRouter from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import Home from '../components/Home.vue'
import CitasForm from '../components/CitasForm.vue'
import MedicosForm from '../components/MedicosForm.vue'


/**
 * compendium of routes
 */

const routes = [{
        path: '/login',
        name: 'login',
        component: LoginForm
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            auth: true
        },
    },
    {
        path: '/',
        name: 'citas',
        component: CitasForm,
        meta: {
            auth: true
        },
    },
    {
        path: '/medicos',
        name: 'medicos',
        component: MedicosForm,
        meta: {
            auth: true
        },
    }
]

const router = new VueRouter({
    routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user');
    if (to.meta.auth) {
        if (loggedIn === null) {
            return next('/login');
        }
    }
    next();
});

export default router