import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import errorRoutes from './error-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  ...errorRoutes
]

const router = new VueRouter({
  routes
})

const whitelist = ['login', 'error401', 'error500', 'notFound', 'compatible', 'notLogin', '404', 'abnormal']

let app;
router.beforeEach((to, from, next) => {
    // const isLogin = !!sessionStorage.getItem('accessToken');
    const isLogin = true

    if (isLogin) {
        if (to.name === 'login') {
            next({
                name: 'home'
            });
        } else {
            next()
        }
    } else {
        if (whitelist.indexOf(to.name) !== -1) {
            next()
        } else {
            next({
                name: 'login'
            })
        }
    }
});


router.afterEach((to, from, next) => {
    app = document.querySelector('.app-content-inner')
    app && app.scrollTo(0, 0)
})

export default router
