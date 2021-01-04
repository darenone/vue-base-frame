import Layout from '@/views/Layout.vue'
export default [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        meta: {
            title: '首页',
            requiresAuth: ['admin', 'user']
        },
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/Home.vue')
            }
        ]
      },
    {
        path: '/about',
        component: Layout,
        meta: {
            title: '关于',
            requiresAuth: ['admin', 'user']
        },
        children: [
            {
                path: '',
                name: 'about',
                component: () => import('@/views/About.vue'),
            }
        ],
        beforeEnter: (to, from, next) => {
            if (from.name === 'home') {
                console.log('从home页跳转过来');
            } else {
                // console.log('不是从home页跳转来的');
            }
            next();
        }
    },
    {
        path: '/house',
        component: Layout,
        meta: {
            title: '房子',
            requiresAuth: ['admin', 'user']
        },
        children: [
            {
                path: '',
                name: 'house',
                component: () => import('@/views/house/index.vue'),
            }
        ],
    },
    {
        path: '/map',
        component: Layout,
        meta: {
            title: '地图找房',
            requiresAuth: ['admin', 'user']
        },
        children: [
            {
                path: '',
                name: 'map',
                component: () => import('@/views/map/index.vue'),
            }
        ],
    },
    {
        path: '/baidu-map',
        component: Layout,
        meta: {
            title: '成都区域分布',
            requiresAuth: ['admin', 'user']
        },
        children: [
            {
                path: '',
                name: 'map',
                component: () => import('@/views/baiduMap/index.vue'),
            }
        ],
    },
]