import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue'
import errorRoutes from './error-router'
import {setTitle} from '@/lib/util'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    meta: {
      title: '首页',
      requiresAuth: ['admin', 'user']
    },
    children: [
      {
        path: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name === 'Home') {
        console.log('从home页跳转过来')
      } else {
        console.log('不是从home页跳转来的')
      }
      next()
    }
  },
  {
    path: '/task-detail/:taskId',
    name: 'task-detail',
    component: () => import('../views/task-detail.vue'),
    props: route => {
      if (route.params && route.params.taskId) {
        return {
          taskId: route.params.taskId
        }
      }
    }
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/product/index.vue'),
    children: [
      {
        path: 'ele-product', // 子路由需要前面加'/'，只有副路由才有
        name: 'ele-product',
        component: () => import('../views/product/ele-product.vue'),
        children: [
          {
            path: 'phone', // 子路由需要前面加'/'，只有副路由才有
            name: 'phone',
            components: {
              default: () => import('../views/product/phone.vue'),
              apple: () => import('../views/product/apple.vue'),
              mi: () => import('../views/product/mi.vue'),
              vivo: () => import('../views/product/vivo.vue'),
            },
          },
          {
            path: 'computer', // 子路由需要前面加'/'，只有副路由才有
            name: 'computer',
            component: () => import('../views/product/computer.vue'),
          }
        ]
      }
    ]
  },
  {
    path: '/father',
    name: 'father',
    component: () => import('../views/father.vue'),
  },
  {
    path: '/house',
    name: 'house',
    component: () => import('../views/house/index.vue'),
  },
  {
    path: '/menu_page',
    name: 'menu_page',
    component: () => import('../views/menu-page.vue'),
  },
  ...errorRoutes,
  {
    path: '*',
    redirect: '/notFound'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

const whitelist = ['login', 'error401', 'error500', 'notFound', 'compatible', 'notLogin', '404', 'abnormal']

let app;
router.beforeEach((to, from, next) => {
  to.meta && setTitle(to.meta.title)
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

// next()方法一定要加，不然不能跳转

router.afterEach((to, from, next) => {
    app = document.querySelector('.app-content-inner')
    app && app.scrollTo(0, 0)
})

export default router
