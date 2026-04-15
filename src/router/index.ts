import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import login from "@/views/login.vue"
import signup from "@/views/signup.vue"
import main from "@/views/main.vue"

const routes: Array<RouteRecordRaw> = [
    { path: '/',name: 'login', component: login },
    { path: '/signup',name: '/signup', component: signup },
    { path: '/main',name: 'main', component: main, meta: { requiresAuth: true }}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _from, next) => {
    const isLoggedIn = localStorage.getItem('isLogged') === 'true'
    if(to.meta.requiresAuth && !isLoggedIn){
        next('/')
    }else if ((to.name === 'login' || to.name === 'signup') && isLoggedIn) {
        next('/main')
    }else{
        next()
    }
})

export default router